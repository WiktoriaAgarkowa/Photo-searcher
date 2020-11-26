import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import './App.css';

const Container = styled.div`
display: grid;
grid-column-gap: 24px;
grid-template-columns: repeat(3, auto);
width: 70%;
margin: auto;
position: relative;
`;

const Item = styled.div`
margin-bottom: 1rem;
display: flex;

&:hover {
    cursor: pointer;
}
`;

const Image = styled.img`
flex: 100%;
object-fit: cover;
width: 100%;
margin-top: 1rem;
border-radius: 10px;

`;

const Popup = styled.div`
position: absolute;
width: 40%;
top: 40%;
left: 50%;
transform: translate(-50%, -60%);
background-color: #fff;
border: 0.5px solid #aaa;
`;

const ImageFull = styled.img`
position: relative;
object-fit: cover;
width: 100%;
padding: 40px;
`;

const ContainerFlex = styled.div`
display: flex;
width: 100%;
align-items: center;
padding: 20px 40px;
`;

const Avatar = styled.img`
border-radius: 50%;
padding-right: 10px;
`;

const Close = styled.p`
font-weight: 800;
margin-left: auto;
font-size: 25px;

&:hover {
    cursor: pointer;
    color: #aaa;
}
`;

const Location = styled.div`
padding: 0 0 20px 40px;
`;

const NoRes = styled.h1`
font-size: 20px;
text-align: center;
`;

const ContainerSearcher = styled.div`
width: 70%;
margin: auto;
height: 200px;
padding-top: 20px;
`;


const Results = (props) => {

    const [click,setClick] = useState(false);
    const [popup, setPopup] = useState('');
    const [user, setUser] = useState('');
    const [location, setLocation] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(()=>{
        console.log(props.allData)
    })
    
    function openWindow(pic) {

        setClick(state => ({
            click: !state.click
        }));
        setPopup(pic.target.attributes.src.nodeValue);
        const data = pic.target.dataset;
        setUser(`@${data.username}`);
        setLocation(data.location);
        setAvatar(data.avatar);
    }

    function closeWindow() {
        setClick(false)
    }

    return(
        <>
            <ContainerSearcher>
                   
            </ContainerSearcher>
                
            <Container >
                
                {props.allData.map((pic) => (

                    <Item key={pic.id}>

                        <Image key={pic.id} 
                        src={pic.urls.full} 
                        onClick={(pic)=> openWindow(pic)} 
                        data-username={pic.user.first_name} 
                        data-location={pic.user.location} 
                        data-avatar={pic.user.profile_image.medium}>
                        </Image>

                    </Item>
                    
                ))}


                {props.allData.length === 0 && props.searchState && 
                    <NoRes>No results :(</NoRes>
                }

                {click && <Popup>

                        <ContainerFlex>
                            <Avatar src={avatar}></Avatar>
                            <p>{user}</p>
                            <Close onClick={closeWindow}>X</Close>
                        </ContainerFlex>
                         <ImageFull src={popup}></ImageFull> 
                         <Location>
                            <p>{location}</p>
                         </Location>

                </Popup>}
            </Container>

        </>
    )


}

export default Results;