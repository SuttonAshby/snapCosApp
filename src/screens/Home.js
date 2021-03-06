import React, { Component } from 'react';

import {
    Button,
    StyleSheet,
    CameraRoll,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
    TouchableHighlight,
    Alert,
} from 'react-native';

import { Camera, FileSystem, Permissions, Constants, takeSnapshotAsync, ImagePicker, launchCameraAsync } from 'expo';
import Square from "../components/square";
import anime from "../../anime.json";
import * as firebase from "firebase";

// =================================================================

export default class Home extends Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        cameraRollUri: null,
        // image: null,
        // source: null,
        anime,
        modalVisible: false,
        modalConfirm: false,
        board: [{ name: 'One', source: null },
        { name: 'Two', source: null },
        { name: 'Three', source: null },
        { name: 'Four', source: null },
        { name: 'Five', source: null },
        { name: 'Six', source: null },
        { name: 'Seven', source: null },
        { name: 'Eight', source: null },
        { name: 'Nine', source: null }],
        currentSquare: null,
        activeBoard: false,


    };

    askPermissionsAsync = async () => { // this was needed to get image picker working and this has to be called in the method as well
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // you would probably do something to verify that permissions
        // are actually granted, but I'm skipping that for brevity
    };


    // =================================================================
    componentWillMount = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    componentDidMount() {
        let newBoard = null;
        const active = true;
        const challenges = []
        console.log("Starting")
        while (challenges.length < 9) {
            let newChallenge = anime[Math.floor(Math.random() * anime.length)].anime
            if (!challenges.includes(newChallenge)) {
                challenges.push(newChallenge)
                console.log(newChallenge)
                console.log(challenges)
            }
        }


        newBoard = this.state.board
        for (let i = 0; i < challenges.length; i++) {
            newBoard[i].name = challenges[i]
        }
        this.setState({ board: newBoard })
        this.setState({ activeBoard: active })
        // ============================================================================
        // if(!this.state.activeBoard) {
        //     for(let i = 0; i < 9; i++){
        //     challenges.push(anime[Math.floor(Math.random() * anime.length)].anime)   
        //     }
        //     console.log(`New Board has: ${challenges}`)
        //     newBoard = this.state.board
        //     for(let i = 0; i < challenges.length; i++){
        //         newBoard[i].name = challenges[i]
        //     }
        //     this.setState({ board: newBoard })
        //     this.setState({ activeBoard: active })
        // }
    }


    // =================================================================


    // _saveToCameraRollAsync = async () => {
    //     await this.askPermissionsAsync();
    //     console.log("savetoCameraRoll");
    //     let result = await takeSnapshotAsync(this._container, {
    //         format: 'png',
    //         result: 'file',
    //     });

    //     let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
    //     console.log("hello");
    //     console.log(result);
    //     _uploadingImages(result.format)
    //     this.setState({ cameraRollUri: saveResult });

    // };

    // =================================================================
    // the method will allow the camera to take a picture
    // snap = async () => {
    //   console.log("snapped");
    //   console.log(this.camera);
    //   if (this.camera) {
    //     console.log('Taking photo');
    //     let photo = await this.camera.takePictureAsync();
    //     console.log(photo);
    // }
    // };
    // =================================================================
    // _pickImage = async () => {
    //   await this.askPermissionsAsync(); //need this permission to get the imagepicker working
    //   console.log("ImagePicker");
    //   let result = await ImagePicker.launchImageLibraryAsync({
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //   });

    //   console.log(result);

    //   if (!result.cancelled) {
    //     this.setState({ image: result.uri });
    //   }
    // };
    // =================================================================

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    //this works!!!
    async press() {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

        let result = await ImagePicker.launchCameraAsync();
        

        console.log('Button Pressed');
        //Toggle Modal
        // this.setModalVisible(!this.state.modalVisible)

        console.log('Taking photo');

        console.log(result);
        
        // let saveResult = await CameraRoll.saveToCameraRoll(result.uri, 'photo');
        // let saveResult = await result.uri;

        // creating date for each picture and using that as an id for each user and image
        const dateId = Date.now();

        let newBoard = null;
        switch (this.state.currentSquare) {
            case 1:
                newBoard = this.state.board
                newBoard[0].source = result.uri
                this.setState({ board: newBoard })
                break;
            case 2:
                newBoard = this.state.board
                newBoard[1].source = result.uri
                this.setState({ board: newBoard })
                break;
            case 3: 
                newBoard = this.state.board
                newBoard[2].source = result.uri
                this.setState({ board: newBoard })
                break;
            case 4:
                newBoard = this.state.board
                newBoard[3].source = result.uri
                this.setState({ board: newBoard })
                break;
            case 5:
                newBoard = this.state.board
                newBoard[4].source = result.uri
                this.setState({ board: newBoard })
                break;
            case 6:
                newBoard = this.state.board
                newBoard[5].source = result.uri
                this.setState({ board: newBoard })
                break;
            case 7:
                newBoard = this.state.board
                newBoard[6].source = result.uri
                this.setState({ board: newBoard })
                break;
            case 8:
                newBoard = this.state.board
                newBoard[7].source = result.uri
                this.setState({ board: newBoard })
                break;
            case 9:
                newBoard = this.state.board
                newBoard[8].source = result.uri
                this.setState({ board: newBoard });
                break;
        }

        // if(this.state.currentSquare === 1){
        //     const newBoard = this.state.board
        //     newBoard[0].source = saveResult
        //     this.setState({ board: newBoard });
        // } else {
        // this.setState({ cameraRollUri: saveResult });
        // }
        // this.setState({currentSquare: saveResult});
        console.log("pressed");
        
    }

    // =================================================================
    // UPLOADING IMAGES TO FIREBASE

    _uploadingImagesToStorage = async (imagesURI, dateId) => {
        // grab the imageURI
        const response = await fetch(imagesURI);
        // put that data into blob and then store that photo into firebase
        const blob = await response.blob();

        // set up firebase so we can put the picture that was just taken into an images folder in firebase
        var ref = firebase.storage().ref().child("images/" + dateId);
        // uploading the images to firebase
        return ref.put(blob);
    }
    // =================================================================
    // TESTING OUT NEW METHOD OF CAMERA
    // onChooseImagePress = async () => {
    //     await Permissions.askAsync(Permissions.CAMERA);
    //     await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //     let result = await ImagePicker.launchCameraAsync();
    //     //let result = await ImagePicker.launchImageLibraryAsync();
        
    //     return result;
    //     // if (!result.cancelled) {
    //     //   this.uploadImage(result.uri, "test-image")
    //     //     .then(() => {
    //     //       Alert.alert("Success");
    //     //     })
    //     //     .catch((error) => {
    //     //       Alert.alert(error);
    //     //     });
    //     // }
    //   }

    // =================================================================


    render() {

        let { hasCameraPermission, image } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Hello</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {

            return (
                // Try setting `flexDirection` to `column`.
                <View style={styles.container}
                    collapsable={false}
                    ref={view => {
                        this._container = view;
                    }} >
                    <View style={styles.board}>
                        <View style={styles.column}>
                            {/* THIS IS COLUMN ONE ================================================================================== */}
                            {/* THIS IS SQUARE ONE ================================================================================== */}
                            {this.state.board[0].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#EE2C38' }]}
                                onPress={() => {
                                    this.setState({ currentSquare: 1 })
                                    {/* this.setModalVisible(true); */}
                                    this.press();
                                }}>
                                <ImageBackground source={{ uri: this.state.board[0].source }}
                                    style={{ flex: 1 }} ><Text>{this.state.board[0].name}</Text></ImageBackground>
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#EE2C38' }}
                                    onPress={() => {
                                        {/* this.setModalVisible(true); */}
                                        this.press();
                                        this.setState({ currentSquare: 1 })
                                    }}><Text>{this.state.board[0].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE TWO ================================================================================== */}
                            {this.state.board[1].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#FAA030' }]}
                                onPress={() => {
                                    {/* this.setModalVisible(true); */}
                                    this.press();
                                    this.setState({ currentSquare: 2 })
                                }}>
                                <Image source={{ uri: this.state.board[1].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#FAA030' }}
                                    onPress={() => {
                                        {/* this.setModalVisible(true); */}
                                        this.press();
                                        this.setState({ currentSquare: 2 })
                                    }}><Text>{this.state.board[1].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE THREE ================================================================================== */}
                            {this.state.board[2].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#32B76C' }]}
                                onPress={() => {
                                    {/* this.setModalVisible(true); */}
                                    this.press();
                                    this.setState({ currentSquare: 3 })
                                }}>
                                <Image source={{ uri: this.state.board[2].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#32B76C' }}
                                    onPress={() => {
                                        {/* this.setModalVisible(true); */}
                                        this.press();
                                        this.setState({ currentSquare: 3 })
                                    }}><Text>{this.state.board[2].name}</Text></TouchableHighlight>}
                        </View>
                        <View style={styles.column}>
                            {/* THIS IS COLUMN ONE ================================================================================== */}
                            {/* THIS IS SQUARE FOUR ================================================================================== */}
                            {this.state.board[3].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#FAA030' }]}
                                onPress={() => {
                                    this.setState({ currentSquare: 4 })
                                    {/* this.setModalVisible(true); */}
                                    this.press();
                                }}>
                                <Image source={{ uri: this.state.board[3].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#FAA030' }}
                                    onPress={() => {
                                        {/* this.setModalVisible(true); */}
                                        this.press();
                                        this.setState({ currentSquare: 4 })
                                    }}><Text>{this.state.board[3].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE FIVE ================================================================================== */}
                            {this.state.board[4].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#32B76C' }]}
                                onPress={() => {
                                    this.setState({ currentSquare: 5 })
                                    {/* this.setModalVisible(true); */}
                                    this.press();
                                }}>
                                <Image source={{ uri: this.state.board[4].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#32B76C' }}
                                    onPress={() => {
                                        {/* this.setModalVisible(true); */}
                                        this.press();
                                        this.setState({ currentSquare: 5 })
                                    }}><Text>{this.state.board[4].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE SIX ================================================================================== */}
                            {this.state.board[5].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#EE2C38' }]}
                                onPress={() => {
                                    this.setState({ currentSquare: 6 })
                                    {/* this.setModalVisible(true); */}
                                    this.press();
                                }}>
                                <Image source={{ uri: this.state.board[5].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#EE2C38' }}
                                    onPress={() => {
                                        {/* this.setModalVisible(true); */}
                                        this.press();
                                        this.setState({ currentSquare: 6 })
                                    }}><Text>{this.state.board[5].name}</Text></TouchableHighlight>}
                        </View>
                        <View style={styles.column}>
                            {/* THIS IS COLUMN ONE ================================================================================== */}
                            {/* THIS IS SQUARE SEVEN ================================================================================== */}
                            {this.state.board[6].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#EE2C38' }]}
                                onPress={() => {
                                    this.setState({ currentSquare: 7 })
                                    {/* this.setModalVisible(true); */}
                                    this.press();
                                }}>
                                <Image source={{ uri: this.state.board[6].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#EE2C38' }}
                                    onPress={() => {
                                        {/* this.setModalVisible(true); */}
                                        this.press();
                                        this.setState({ currentSquare: 7 })
                                    }}><Text>{this.state.board[6].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE EIGHT ================================================================================== */}
                            {this.state.board[7].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#FAA030' }]}
                                onPress={() => {
                                    this.setState({ currentSquare: 8 })
                                    {/* this.setModalVisible(true); */}
                                    this.press();
                                }}>
                                <Image source={{ uri: this.state.board[7].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#FAA030' }}
                                    onPress={() => {
                                        {/* this.setModalVisible(true); */}
                                        this.press();
                                        this.setState({ currentSquare: 8 })
                                    }}><Text>{this.state.board[7].name}</Text></TouchableHighlight>}
                            {/* THIS IS SQUARE NINE ================================================================================== */}
                            {this.state.board[8].source ? <TouchableHighlight style={[styles.square, { backgroundColor: '#32B76C' }]}
                                onPress={() => {
                                    this.setState({ currentSquare: 9 })
                                    {/* this.setModalVisible(true); */}
                                    this.press();
                                }}>
                                <Image source={{ uri: this.state.board[8].source }}
                                    style={{ flex: 1 }} />
                            </TouchableHighlight>
                                : <TouchableHighlight style={{ flex: 1, backgroundColor: '#32B76C' }}
                                    onPress={() => {
                                        {/* this.setModalVisible(true); */}
                                        this.press();
                                        this.setState({ currentSquare: 9 })
                                    }}><Text>{this.state.board[8].name}</Text></TouchableHighlight>}
                        </View>
                    </View>
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <View style={styles.container}>
                            <View style={styles.board}>
                                <View style={styles.column}>
                                    <Camera style={styles.camera}
                                        type={this.state.type}
                                        ref={ref => {
                                            this.camera = ref;
                                        }}>
                                        <View
                                            style={{
                                                flex: 1,
                                                backgroundColor: 'transparent',
                                                flexDirection: 'row',
                                            }} />
                                        {/* <TouchableHighlight
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Text>Hide Modal</Text>
                                        </TouchableHighlight> */}
                                        <Button
                                            title="Snap"
                                            style={{ flex: 0, backgroundColor: 'red' }}
                                            onPress={this.press.bind(this)}
                                        />
                                        <Button
                                            title="Back"
                                            style={{ flex: 0, backgroundColor: 'red' }}
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}
                                        />
                                    </Camera>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalConfirm}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        
                    </Modal>
                </View>

            );

        }
    }

}

const styles = {
    container: {
        marginTop: 48,
        //   width: 200,
        //   height: 200,
        flexDirection: 'row',
        flex: 1,
        // aspectRatio: 1,
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    board: {
        flexDirection: 'row',
        flex: 1,
        aspectRatio: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        flex: 1,
        //   marginLeft: 24,
        //   marginRight: 24,
        //   marginBottom: 24
    },
    square: {
        flex: 1,
        // transform: [{ rotate: '90deg' }]
        //TODO: fix camera orientation
    },
    camera: {
        flex: 1,
    }
}


