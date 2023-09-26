import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../../features/client/clientSlice';

export default function ListProduct() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos)
  const Nike = 'IAOy8rsbh1xJQsXhaYMS';
  const Adidas = 'SHtVfKnkyhRbRfPlA590';
  useEffect(() =>{
    dispatch(fetchTodos());
  },[dispatch]);
  return (
    <>
    <div className="divider text-xl">Tất Cả</div>

    <div className='grid grid-cols-4 gap-4'>
    {todos?.map((product) => {
          if (product.status === 'Hiện') {
            return (
              <div key={product.id} className="card w-85 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img src={product.avt} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            );
          } else {
            return null; 
          }
        })}

    </div>
    <div className="divider text-xl">Nike</div>
    <div className='grid grid-cols-4 gap-4'>

    {todos?.map((product) =>
          product.category === Nike ? (
            <div key={product.id} className="card w-85 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={product.avt} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ) : null
        )}
    </div>
    <div className="divider text-xl">Adidas</div>
    <div className='grid grid-cols-4 gap-4'>

    {todos?.map((product) =>
          product.category === Adidas ? (
            <div key={product.id} className="card w-85 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={product.avt} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ) : null
        )}
    </div>
    </>
  )
}
