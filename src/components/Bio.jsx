import logoStuff from '../assets/profileicon.svg'
import {useEffect, useState} from 'react'
import getPhotoUrl from 'get-photo-url'

import { db } from './dexie'

const Bio = () => {
    const  [userDetails, setUserDetails] = useState({
        name:'Joshua Mondie',
        about:'Building New dev.io - learn to code and connect with the best minds'
    })

    const [editFormIsOpen, setEditFormIsOpen] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState(logoStuff)

    useEffect(()=> {
        const setDataFromDb = async () =>  {
            const userDetailsFromDb = await db.bio.get('info')
            const profilePhotoFromDb = await db.bio.get('profilePhoto')
            userDetailsFromDb && setUserDetails(userDetailsFromDb)
            profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb )
        }

        setDataFromDb()
    }, [])

    const updateUserDetails = async (event)=>{
        event.preventDefault()
        const objectData = {
            name: event.target.nameOfUser.value,
            about: event.target.aboutUser.value,
        }
        setUserDetails(objectData)

       await db.bio.put(objectData,'info')

        setEditFormIsOpen(false)
    }

    const updateProfilePhoto = async () =>  {
        const newProfilePhoto = await getPhotoUrl('#profilePhotoInput')
        setProfilePhoto( newProfilePhoto )
        await db.bio.put(newProfilePhoto, 'profilePhoto')
    }
    
    const editForm = (
        <form className='edit-bio-form' onSubmit={(e) => updateUserDetails(e)}>
            <input type="text" id='' name='nameOfUser' defaultValue={userDetails?.name} placeholder='Your Name' />
            <input type="text" id='' name='aboutUser' defaultValue={userDetails?.about} placeholder='About you' />
            <br />
            <button type='button' className='cancel-button' onClick={() => setEditFormIsOpen(false)}>
                Cancel
            </button>
            <button type='submit'>Save</button>

        </form>
    )

    const editButton = <button onClick={() => setEditFormIsOpen (true)}>Edit</button>

  

    return ( 
        <section className="bio">
            <input type="file" accept='image/*' name='photo' id='profilePhotoInput' />

            <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>

            <div className="profile-photo" role="button" title="Click to edit photo">
                <img src={profilePhoto} alt="profile" />
            </div>

            </label>
            <div className="profile-info">

                <p className="name">{userDetails.name}</p>

                <p className="about">{userDetails.about}</p>

                <div className='edit'>

                {editFormIsOpen ? editForm : editButton }
                </div>

            </div>
        </section>
     );
}
 
export default Bio;