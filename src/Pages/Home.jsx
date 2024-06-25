import React, { useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const Home = () => {
    
    const [users,setUsers]=useState([])
    const loadusers=()=>{
        axios.get("http://localhost:3003/users")
        .then((res)=>{
            setUsers(res.data.reverse())
            
        })
    }
    useEffect(()=>{
        loadusers()
    },[])

    function handledelete(id){
        axios.delete(`http://localhost:3003/users/${id}`)
        .then(
            loadusers()
        )
    }

  return (
    <div className='w-full h-full flex flex-col px-10 py-8 '>

       <div className="flex flex-col ml-[4rem]">
            <h1 className='text-3xl text-blue-600 font-semibold mb-2'>Home page</h1>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 border border-blue-100 rounded-lg p-2 ">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table
                    className="min-w-full text-left text-lg font-light text-surface dark:text-white">
                    <thead
                        className="border-b border-neutral-200 font-medium dark:border-white/10">
                        <tr>
                        <th scope="col" className="px-6 py-4">#</th>
                        <th scope="col" className="px-6 py-4">Name</th>
                        <th scope="col" className="px-6 py-4">Email</th>
                        <th scope="col" className="px-6 py-4">Phone</th>
                        <th scope="col" className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((data,index)=>(
                            
                        <tr key={index} className="border-b border-neutral-200 dark:border-white/10">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{data.name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{data.email}</td>
                        <td className="whitespace-nowrap px-6 py-4">{data.phone}</td>
                        <td className="whitespace-nowrap flexjjustify-center items-center space-x-4">
                            
                            <Link to={`/users/${data.id}`}>
                            <button className='bg-blue-400 text-white px-3 py-1 rounded-md'>View</button>
                            </Link>
                            <Link to={`/edit/${data.id}`}>
                            <button className='bg-blue-500 text-white px-3 py-1 rounded-md'>Edit</button>
                            </Link>
                            <button title='Double Click' onClick={()=>handledelete(data.id)} className='bg-blue-600 text-white px-3 py-1 rounded-md'>Delete</button>
                        </td>
                        </tr>
                        ))}
                        
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home