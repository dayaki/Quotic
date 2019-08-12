import React from "react";
import styled from "styled-components/native";

const Landing = () => {
  return (
    <Container>
      <Logo>"</Logo>
      <SubTitle>Get</SubTitle>
      <Title>Inspired</Title>

      <Button>
        <ButtonText>Let's Go</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  background: #fff;
  padding: 20px;
`;
const Logo = styled.Text`
  font-size: 40;
  color: #000;
  margin-bottom: 20;
`;
const SubTitle = styled.Text``;
const Title = styled.Text``;
const Button = styled.TouchableOpacity``;
const ButtonText = styled.Text``;

export default Landing;
