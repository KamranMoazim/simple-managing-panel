import React,{useState} from 'react'
import './EachRecord.css'


var faunadb = require('faunadb'),
    q = faunadb.query;

var client = new faunadb.Client({ secret: "fnAEC613dnACDVzFZUJQLZu_gxBkJVKTfHFzzQes" });


function EachRecord({comingData, value}) {

  const [update, setUpdate] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("pending");
  const [Data, setData] = useState(comingData)


  
    const updateToFauna = async () => {

            try{
                const result = await client.query(
                    q.Update(
                        q.Ref(q.Collection('orders'), value.id),
                        { data: { ...comingData , status:updatedStatus } },
                    )
            );
            console.log(result)
        } catch(err){
            console.log(err);
        }      
      }

    if (update) {
      updateToFauna();
    } 

    return (
        <>
            <div>

                 <table className="table">
                    <tbody>
                        <tr>
                            <td><span>{Data.name}</span></td>
                            <td><span>{Data.whatsApp}</span></td>
                            <td><span>{Data.city}</span></td>
                            <td><span>{Data.email}</span></td>
                            <td><span>{Data.address}</span></td>
                            <td><span>{Data.zip}</span></td>
                            <td><span>{Data.itemCodes}</span></td>
                            <td><span>{Data.orderCode}</span></td>
                            <td><span>{Data.status}</span></td>
                            {/* <td><span>Change Status</span></td>
                            <td><span>Action</span></td> */}
                            <td><span>
                            <form>
                              <label >Change Status</label> &nbsp;
                              <select onChange={(e)=>{setUpdatedStatus(e.target.value)}} value={updatedStatus} id="cars" name="cars">
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="completed">Completed</option>
                              </select>
                            </form>
                            </span></td>
                            <td><span>
                              <button onClick={()=>{setUpdate(true)}}>Update Status</button>  
                            </span></td>
                        </tr>
                    </tbody>
                </table>

            </div>


        </>
    )
}

export default EachRecord







