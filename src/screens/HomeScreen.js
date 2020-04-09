import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import {
  Container,
  Header,
  Body,
  Button,
  Title,
  Content,
  Left,
  Right,
  Icon,
} from 'native-base';

import { API, graphqlOperation } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import { listEvents } from '../graphql/queries';

import EventBox from '../components/EventBox';
import { updateDatabaseUser } from '../utils/users';

export default function ({ navigation, route }) {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [user, setUser] = useState([]);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    if (route.params?.refreshList) {
      setRefreshing(true);
    }
    authUser();
    getAllEvents();
  }, [route.params]);

  async function authUser() {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (cognitoUser) {
      setUser(cognitoUser);
      updateDatabaseUser(cognitoUser.username, cognitoUser.attributes, loaded);
      setLoaded(false);
      Analytics.record({
        name: 'loaded',
      });
    }
  }

  async function getAllEvents() {
    const filters = {
      startAt: {
        ge: parseInt(new Date().getTime() / 1000),
      },
    };

    const limit = 10;
    const allEvents = await API.graphql(
      graphqlOperation(listEvents, filters, limit)
    );
    // console.log(allEvents.data.listEvents.items.length);
    setRefreshing(false);
    setEvents(
      allEvents.data.listEvents.items.sort(function (a, b) {
        return a.startAt === b.startAt ? 0 : a.startAt < b.startAt ? -1 : 1;
      })
    );
  }

  const renderEvents = () => {
    return events.map((event) => (
      <EventBox
        currentUser={user}
        isClickable={true}
        key={event.id}
        event={event}
        navigation={navigation}
      />
    ));
  };

  const onRefresh = () => {
    setRefreshing(true);
    getAllEvents();
  };

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Home</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate('Create')}>
            <Icon name='add'></Icon>
          </Button>
        </Right>
      </Header>
      <Content
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title='Loading'
          />
        }
        padder
        style={{ alignContent: 'center' }}
      >
        {renderEvents(events)}
      </Content>
    </Container>
  );
}
