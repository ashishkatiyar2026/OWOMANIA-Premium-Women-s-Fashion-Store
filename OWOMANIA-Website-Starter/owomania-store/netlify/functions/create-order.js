const Razorpay = require('razorpay');
const { createClient } = require('@supabase/supabase-js');
const {validateItems} = require('./catalog');
const headers = {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'};
exports.handler = async (event) => {
 if(event.httpMethod==='OPTIONS') return {statusCode:200,headers};
 if(event.httpMethod!=='POST') return {statusCode:405,headers,body:JSON.stringify({error:'Method not allowed'})};
 try {
  const {customer,items:submittedItems}=JSON.parse(event.body||'{}');
  const items=validateItems(submittedItems);
  if(!customer?.name||!/^\d{10}$/.test(customer.phone)||!customer.address||!/^\d{6}$/.test(customer.pincode)||!Array.isArray(items)||!items.length) throw new Error('Please complete all required checkout details.');
  const calculated=items.reduce((s,i)=>s+i.unit_price*i.quantity,0);
  if(calculated<1||calculated>500000) throw new Error('Invalid order amount.');
  const supabase=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);
  const orderNumber='OW'+Date.now().toString().slice(-9);
  const {data:order,error}=await supabase.from('orders').insert({order_number:orderNumber,customer_name:customer.name,phone:customer.phone,email:customer.email||null,address:customer.address,pincode:customer.pincode,items,total:calculated,payment_method:'razorpay',payment_status:'pending',order_status:'new'}).select('id').single();
  if(error) throw error;
  const razorpay=new Razorpay({key_id:process.env.RAZORPAY_KEY_ID,key_secret:process.env.RAZORPAY_KEY_SECRET});
  const rp=await razorpay.orders.create({amount:calculated*100,currency:'INR',receipt:orderNumber,notes:{order_id:order.id,order_number:orderNumber}});
  await supabase.from('orders').update({razorpay_order_id:rp.id}).eq('id',order.id);
  return {statusCode:200,headers,body:JSON.stringify({key_id:process.env.RAZORPAY_KEY_ID,razorpay_order_id:rp.id,amount:rp.amount,order_id:order.id,order_number:orderNumber})};
 } catch(e){return {statusCode:400,headers,body:JSON.stringify({error:e.message||'Unable to create payment order'})}}
};
