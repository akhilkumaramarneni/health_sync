import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // make a global pass to check patient or doctor // for now mockup
import { useAuth } from '../../store/AuthContext';
import { getUniqueId } from 'react-native-device-info';
import { ROLES } from '../../constants'


export default function BiometricLogin() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { setLoggedInUserType, userType, setLoggedInUserName } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        // for now based on device id patient or doctor add for extra devices
        getUniqueId().then((uniqueId) => {
            // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
            // Android: "dd96dec43fb81c97"
            if (uniqueId == "EB49497A-CCE9-44C9-BD28-75F2E33048A7" || uniqueId == "193c6a5a8fe2ce9e") {
                console.log(uniqueId, " and loggined as patient");
                setLoggedInUserType("patient");
                setLoggedInUserName('Mr. Akhil')
            }
            else {
                console.log(uniqueId, " and loggined as doctor");
                setLoggedInUserType("doctor")
                setLoggedInUserName('Dr. Akhil')
            }
        });
    })
    
    const onSignIn = () => {
        console.log("Sign In clicked");
        navigation.navigate('MainPatientNavigator');
        // if(userType == ROLES.PATIENT) navigation.navigate('MainPatientNavigator');
        // else navigation.navigate('MainDoctorNavigator');
        // navigation.navigate('MainPatientNavigator')
    }
    
    const enableFaceId = () => {
        TouchID.authenticate('to demo this react-native component')
            .then(success => {
                // basically while register time, send deviceid, name, password store in backend
                // next time on login -> get details of username and password and get userdata, use to store in storage 
                // use them to send after faceid login

                // for now just use local store id and password
                console.log("faceid success");
                if(userType == ROLES.PATIENT) navigation.navigate('MainPatientNavigator');
                else navigation.navigate('MainDoctorNavigator');
            })
            .catch(error => {
                console.log("faceid failure")
            });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerIcon}>
                        <FeatherIcon color="#075eec" name="lock" size={44} />
                    </View>

                    <Text style={styles.title}>
                        Welcome to <Text style={{ color: '#0742fc' }}>Health Sync</Text>
                    </Text>

                    {/* <Text style={styles.subtitle}>Collaborate with your friends</Text> */}
                </View>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Email address</Text>

                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            onChangeText={email => setForm({ ...form, email })}
                            placeholder=""
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={form.email}
                        />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Password</Text>

                        <TextInput
                            autoCorrect={false}
                            onChangeText={password => setForm({ ...form, password })}
                            placeholder=""
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            secureTextEntry={true}
                            value={form.password}
                        />
                    </View>

                    <View style={styles.formAction}>
                        <TouchableOpacity
                            onPress={() => {
                                // handle onPress
                                onSignIn()
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Sign in</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.formActionSpacer} />

                        <TouchableOpacity
                            onPress={() => {
                                enableFaceId()
                            }}>
                            <View style={styles.btnSecondary}>
                                <MaterialCommunityIcons
                                    color="#000"
                                    name="face-recognition"
                                    size={22}
                                    style={{ marginRight: 12 }}
                                />

                                <Text style={styles.btnSecondaryText}>Face ID</Text>

                                <View style={{ width: 34 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.formFooter}>
                        By clicking "Sign in" above, you agree to RealApps's
                        <Text style={{ fontWeight: '600' }}> Terms & Conditions </Text>
                        and
                        <Text style={{ fontWeight: '600' }}> Privacy Policy</Text>.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    header: {
        marginVertical: 36,
    },
    headerIcon: {
        alignSelf: 'center',
        width: 80,
        height: 80,
        marginBottom: 36,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 6,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center',
    },
    form: {
        marginBottom: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    formAction: {
        marginVertical: 24,
    },
    formActionSpacer: {
        marginVertical: 8,
    },
    formFooter: {
        marginTop: 'auto',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        color: '#929292',
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    inputControl: {
        height: 44,
        backgroundColor: '#fff',
        paddingLeft: 110,
        paddingRight: 24,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    inputLabel: {
        position: 'absolute',
        width: 110,
        lineHeight: 44,
        top: 0,
        left: 0,
        bottom: 0,
        marginHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: '500',
        color: '#c0c0c0',
        zIndex: 9,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#000',
        borderColor: '#000',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
    btnSecondary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: '#000',
    },
    btnSecondaryText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#000',
    },
});