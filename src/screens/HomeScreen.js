import React from 'react';
import {
  Container,
  Header,
  Body,
  Button,
  Title,
  Text,
  Content,
  Card,
  CardItem
} from 'native-base';

export default function({ navigation }) {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Home Header</Title>
        </Body>
      </Header>
      <Content padder style={{ alignContent: 'center' }}>
        <Card>
          <CardItem>
            <Body>
              <Text>//Your text here</Text>
              <Text>//Your text here</Text>
              <Text>//Your text here</Text>
              <Text>//Your text here</Text>
              <Text>//Your text here</Text>
              <Button
                onPress={() => {
                  navigation.navigate('Modal');
                }}
                bordered
              >
                <Text>Open Modal</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
