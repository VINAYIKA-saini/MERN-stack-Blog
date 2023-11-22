import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'data:image/png;base64,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';

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                            <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;