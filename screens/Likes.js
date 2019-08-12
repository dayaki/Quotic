import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";

const colors = [
  "#ED1E79",
  "#662D8C",
  "#00A99D",
  "#93278F",
  "#4F00BC",
  "#29ABE2",
  "#5A5454",
  "#3A3897",
  "#F24645",
  "#312A6C"
];

const randomColor = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

const Likes = props => {
  const [quotes, setQuotes] = useState(null);
  useEffect(() => {
    getLikes();
  }, []);

  const getLikes = async () => {
    const status = JSON.parse(await AsyncStorage.getItem("myQuotes"));
    if (status !== null) {
      setQuotes(status);
    }
  };

  return (
    <Container bgColor={randomColor(colors)}>
      <Header>
        <BackBtn activeOpacity={0.8} onPress={() => props.navigation.goBack()}>
          <SimpleLineIcons name="arrow-left" color="#fff" size={18} />
        </BackBtn>
      </Header>
      <Content>
        {quotes !== null &&
          quotes.map(quote => (
            <QuoteItem key={quote._id}>
              <Quote activeOpacity={0.8} onPress={() => copyText(quote._id)}>
                <QuoteText>{quote.text}</QuoteText>
                <Author>
                  <Line />
                  <Name>{quote.author}</Name>
                </Author>
              </Quote>
              <Divider />
            </QuoteItem>
          ))}
      </Content>
    </Container>
  );
};

const Divider = styled.View`
  width: 78%;
  height: 1;
  align-self: center;
  background: rgba(255, 255, 255, 0.2);
`;
const Content = styled.View``;
const Line = styled.View`
  width: 20;
  height: 1;
  background: rgba(255, 255, 255, 0.5);
  margin-top: 3;
  margin-right: 10;
`;
const Name = styled.Text`
  color: #fff;
  font-family: "noto-bold";
  font-size: 15;
  opacity: 0.7;
`;
const Author = styled.View`
  flex-direction: row;
  align-items: center;
`;
const QuoteText = styled.Text`
  line-height: 35;
  font-family: "libre-regular";
  font-size: 20;
  align-self: flex-start;
  color: #fff;
`;
const Quote = styled.TouchableOpacity`
  margin-bottom: 30;
`;
const QuoteItem = styled.View`
  padding: 20px;
  justify-content: center;
`;
const Header = styled.View`
  width: 100%;
  height: 40;
  padding-left: 5px;
  padding-top: 20px;
`;
const BackBtn = styled.TouchableOpacity``;
const Container = styled.ScrollView`
  flex: 1;
  background: ${props => props.bgColor || "red"};
  padding: 20px;
`;

export default Likes;
