import { Box, Button, CircularProgress, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../../header/Header'
import Search from '../Search'
import { useNavigate } from 'react-router-dom';
import { LensAuthContext } from '../../context/LensContext';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { exploreProfile } from '../../LensProtocol/profile/explore-profiles';

function MemeList() {
    const navigate = useNavigate();
    const [story, setStory] = useState([]);

    const lensAuthContext = React.useContext(LensAuthContext);
    const { userPosts, } = lensAuthContext;


    const handleNavigate = (e) => {
        navigate(`/${e.id}`)
    }

    useEffect(() => {
        async function getCreator() {
            var arry = [];

            // const res = await exploreProfile();
            // console.log(res,"res");

            const q = query(collection(db, "profiles"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                arry.push(doc.data())
            });
            setStory(arry);

        }
        getCreator()
    }, [])
 


    return (
        <>
            <Header />
            <div style={{ marginTop: '100px' }}>
                <Search />
                <div className='container'>
                    <div className='row mt-5'>
                        {
                            story.length == 0 && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        }
                        {
                            story && story.map((e) => {
                                return (
                                    <div className='col-12 col-sm-6 col-md-4 col-lg-4' key={e.handle}>
                                        <Box style={{ margin: '10px  ', background: 'rgba(255,255,255,0.1)', padding: '20px' }}>
                                            <div className='text-center' onClick={() => handleNavigate(e)}>
                                                <img src={e.photo ? e.photo : 'assets/bg.png'} width="100" height="100" style={{ borderRadius: '50%' }} alt={e.handle} />
                                                <h5 className='pt-4' style={{ fontWeight: '600' }}>{e.name}</h5>
                                                <h6 className='' style={{ fontWeight: '600' }}>{`@${e.handle.trim().toLowerCase()}`}</h6>
                                                <p>{e.description}</p>
                                                <Button variant='outlined'>Follow</Button>
                                            </div>
                                            {/* <Divider flexItem orientation="horizontal" style={{border:'1px solid white',margin :'10px 10px'}} /> */}

                                            <div className='d-flex justify-content-around text-left mt-4'>
                                                <div className='p-0 m-0'>
                                                    <p className='p-0 m-0'>Followers</p>
                                                    <h4 className='p-0 m-0'>101</h4>

                                                </div>
                                                <Divider flexItem orientation="vertical" style={{ border: '1px solid white', margin: '0 10px' }} />
                                                <div className='p-0 m-0'>
                                                    <p className='p-0 m-0'>Following</p>
                                                    <h4 className='p-0 m-0'>56</h4>

                                                </div>
                                            </div>
                                            {/* <Divider flexItem orientation="horizontal" style={{border:'1px solid white',margin :'10px 10px'}} /> */}

                                            <div className='d-flex justify-content-around text-left mt-4'>
                                                <Button variant='outlined'>Hire Me</Button>
                                                <Button variant='outlined'>Send Message</Button>
                                            </div>
                                        </Box>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemeList