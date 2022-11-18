import React from 'react'

const Title = ({value}:{value:string}) => {
  return (
    <section className='page-title'>
        <h2>{value}</h2>
        <hr />
    </section>
  )
}

export default Title;