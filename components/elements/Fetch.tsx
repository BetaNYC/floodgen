// import React, { useState, useEffect } from 'react'

// import Image from 'next/image'

// const Fetch = () => {

//     const [photos, setPhotos] = useState([])

//     useEffect(() => {
//         // fetch('https://jsonplaceholder.typicode.com/photos')
//         //     .then(res => res.json())
//         //     .then(data => {
//         //         console.log(data[0].url)
//         //         setPhotos(data)
//         //     })

//         const fetch =  async () => {
//             const response = await fetch('https://jsonplaceholder.typicode.com/photos')
//             const data = await response.json()
//             setPhotos(data)
//         }   

//         fetch()
//     }, [])

//     return (
//         <div>

//         </div>
//     )
// }

// export default Fetch