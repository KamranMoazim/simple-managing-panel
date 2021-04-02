import React, {useState,useEffect} from 'react'; //,{useState, useEffect}
import EachRecord from './EachRecord.js'
import './EachRecord.css'


var faunadb = require('faunadb'),
    q = faunadb.query;

var client = new faunadb.Client({ secret: "fnAEC613dnACDVzFZUJQLZu_gxBkJVKTfHFzzQes" });



function Panel() {

    const [comingData,setComingData] = useState({})
    const [show,setShow] = useState(false)

    useEffect(()=>{

        const savetoFauna = async () => {
            try{
                let result = await client.query(
                    q.Map(
                        q.Paginate(q.Documents(q.Collection('orders'))),
                        q.Lambda(x => q.Get(x))
                      )
            );
            setComingData(result)
        } catch(err){
            console.log(err);
        }      
      }

      if (show) {
        savetoFauna();
      }

    },[show])

    console.log(comingData.data)

    return (
        <div>

            <div >
                <table className="table">
                    <thead>
                        <tr>
                            <th><span>Name</span></th>
                            <th><span>WhatsApp</span></th>
                            <th><span>City</span></th>
                            <th><span>Email</span></th>
                            <th><span>Address</span></th>
                            <th><span>Zip</span></th>
                            <th><span>Item Code</span></th>
                            <th><span>Order Code</span></th>
                            <th><span>Order Status</span></th>
                            <th><span>Change Status</span></th>
                            <th><span>Action</span></th>
                        </tr>
                    </thead>
                </table>
                {/* <span>Name</span>
                <span>WhatsApp</span>
                <span>City</span>
                <span>Email</span>
                <span>Address</span>
                <span>Zip</span>
                <span>Item Code</span>
                <span>Order Code</span>
                <span>Order Status</span>
                <span>Change Status</span>
                <span>Action</span> */}

            {comingData.data?comingData.data.map((eachRecord,index)=>{
                return <EachRecord comingData={eachRecord.data} value={eachRecord.ref.value} key={index} />
            }):null}

            </div>



            <button onClick={()=>{setShow(!show)}} className={show?"noooooo":null}>{show?null:"Show Data"}</button>
        </div>
    )
}

export default Panel

