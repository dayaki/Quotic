import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Share, Clipboard, Dimensions, AsyncStorage } from "react-native";
import {
  Ionicons,
  EvilIcons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import LottieView from "lottie-react-native";
import shuffle from "../components/Shuffle";

const Quotes = props => {
  const lottie = useRef(null);
  const [quotes, setQuotes] = useState(null);
  const [toastVisibility, setToastVisibility] = useState(false);

  useEffect(() => {
    lottie.current.play();
    fetch("https://quotic.herokuapp.com/quotes")
      .then(result => result.json())
      .then(data => {
        setQuotes(data.data);
      });
  }, []);

  const copyText = id => {
    const temp = quotes.filter(el => el._id === id);
    const quote = `"${temp[0].text}" - ${temp[0].author}`;
    // const copied = Clipboard.setString(quote);
    console.log("copied", quote);
  };

  const onShare = async id => {
    const temp = quotes.filter(el => el._id === id);
    const quote = `"${temp[0].text}" - ${temp[0].author}`;
    try {
      const result = await Share.share({
        message: quote
      });
      console.log("shared", result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onSave = async id => {
    const temp = quotes.filter(el => el._id === id);
    try {
      const value = JSON.parse(await AsyncStorage.getItem("myQuotes"));
      if (value !== null) {
        const existed = value.filter(el => el._id === id);
        if (existed.length > 0) {
          const remained = value.filter(el => el._id !== id);
          await AsyncStorage.setItem("myQuotes", JSON.stringify(remained));
        } else {
          value.push(temp[0]);
          await AsyncStorage.setItem("myQuotes", JSON.stringify(value));
        }
      } else {
        const tempData = [];
        tempData.push(temp[0]);
        await AsyncStorage.setItem("myQuotes", JSON.stringify(tempData));
      }
      setToastVisibility(true);
      setTimeout(function() {
        setToastVisibility(false);
      }, 1000);
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <>
      {quotes !== null ? (
        <>
          <Likes
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate("Likes")}
          >
            <MaterialCommunityIcons
              name="heart-circle"
              color="#fff"
              size={36}
            />
          </Likes>
          <Logo>
            <FontAwesome name="quote-left" color="#fff" size={40} />
          </Logo>
          <Container
            horizontal
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal
            bounces
            pagingEnabled
          >
            {quotes.map(quote => (
              <QuoteItem
                key={quote._id}
                style={{ backgroundColor: quote.color }}
              >
                <Quote activeOpacity={0.8} onPress={() => copyText(quote._id)}>
                  <QuoteText>{quote.text}</QuoteText>
                </Quote>
                <Author>
                  <Name>{quote.author}</Name>
                  <Line />
                </Author>

                <Buttons>
                  <Button activeOpacity={0.8} onPress={() => onSave(quote._id)}>
                    <Ionicons
                      name="ios-heart"
                      color="#fff"
                      size={30}
                      style={{ marginTop: 5 }}
                    />
                  </Button>
                  <Button
                    activeOpacity={0.8}
                    onPress={() => onShare(quote._id)}
                  >
                    <EvilIcons name="share-google" color="#fff" size={30} />
                  </Button>
                </Buttons>
              </QuoteItem>
            ))}
          </Container>
        </>
      ) : (
        <Loading>
          <LottieView
            ref={lottie}
            style={{
              width: 200,
              height: 200
            }}
            source={require("../assets/loader.json")}
          />
        </Loading>
      )}
      <Toast visible={toastVisibility} duration={Toast.durations.SHORT}>
        Quote copied to your clipboard
      </Toast>
    </>
  );
};

const Loading = styled.View`
  flex: 1;
  background: #dccd62;
  justify-content: center;
  align-items: center;
`;
const Button = styled.TouchableOpacity`
  width: 50;
  height: 50;
  border-radius: 25;
  border: #fff;
  justify-content: center;
  align-items: center;
  margin-right: 25;
`;
const Buttons = styled.View`
  align-self: center;
  flex-direction: row;
  margin-top: 150;
`;
const Line = styled.View`
  width: 20;
  height: 1;
  background: rgba(255, 255, 255, 0.6);
  margin-top: 3;
`;
const Name = styled.Text`
  margin-right: 10;
  color: #fff;
  font-family: "noto-bold";
  font-size: 15;
`;
const Author = styled.View`
  flex-direction: row;
  align-items: center;
`;
const QuoteText = styled.Text`
  line-height: 35;
  font-family: "libre-regular";
  font-size: 25;
  align-self: flex-start;
  color: #fff;
`;
const Quote = styled.TouchableOpacity`
  margin-bottom: 30;
`;
const QuoteItem = styled.View`
  padding: 20px;
  width: ${Dimensions.get("screen").width};
  height: 100%;
  padding-top: 200;
  justify-content: center;
`;
const Logo = styled.View`
  position: absolute;
  z-index: 100;
  top: 200;
  left: 20;
`;
const Likes = styled.TouchableOpacity`
  position: absolute;
  z-index: 100;
  top: 50;
  right: 30;
  padding: 10px;
`;
const Container = styled.ScrollView`
  flex: 1;
  /* justify-content: center;
  align-content: center; */
`;

export default Quotes;
