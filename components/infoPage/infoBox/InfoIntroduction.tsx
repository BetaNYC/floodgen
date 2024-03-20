import React from 'react'


type Props = {
    clickHandler: () => void
}


const InfoIntroduction = ({ clickHandler }: Props) => {
    return (
        <div>
            <button className='mt-2 px-6 py-1 font-semibold text-small lg:text-[1.5rem] text-white bg-primary_blue rounded-[2.5rem]' onClick={clickHandler}>Visual narrative</button>
        </div>

    )
}

export default InfoIntroduction