import { useRouter } from 'next/router'
import React from 'react';
import { Box, Text, Image, Button } from '@skynexui/components';
import appConfig from '../config.json';


export default function GitUserPage(data) {
    const [userData, setUserData] = React.useState({});
    let username = data.username
    React.useEffect(() => {
        getUserData();
    }, [username]);

    var gitHubUrl = `https://api.github.com/users/${username}`;

    const getUserData = async () => {
        const response = await fetch(gitHubUrl);
        const jsonData = await response.json();
        if (jsonData && jsonData.message !== "Not Found") {
            setUserData(jsonData);
        }
    };
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    width: '100%', maxWidth: '700px',
                    borderRadius: '5px', padding: '32px', margin: '16px',
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                    }}

                >
                    <Image
                        styleSheet={{
                            maxWidth: '100px',
                            borderRadius: '50%',
                            marginBottom: '16px',

                        }}
                        src={`https://github.com/${userData.login + ".png"}`}
                    />
                    <Text
                        variant="body4"
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[200],
                            backgroundColor: appConfig.theme.colors.neutrals[900],
                            padding: '3px 10px',
                            borderRadius: '1000px'
                        }}
                    >
                        {userData.login}
                    </Text>

                </Box>
                <Box
                    as="form"
                    styleSheet={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px', marginTop: '32px'
                    }}
                >
                    <Text
                        variant="body4"
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[200],
                            backgroundColor: appConfig.theme.colors.neutrals[900],
                            padding: '3px 10px',
                            borderRadius: '1000px',
                            margin: '1px'
                        }}
                    >
                        <br />
                        Seguidores: {userData.followers}
                        <br />
                        Seguindo: {userData.following}
                    </Text>
                </Box>
            </Box>
        </>
    )
}