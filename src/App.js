import React from "react";
import { Resource, Admin } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import authProvider from './authProvider';

import myDataProvider from './myDataProvider';

import { Login } from './page';

import { MyLayout, EventCreate, EventEdit, EventList, EventsSliderCreate, EventsSliderEdit, EventsSliderList } from './components';

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const App = () => (
	<Admin i18nProvider={i18nProvider} loginPage={Login} authProvider={authProvider} dataProvider={myDataProvider} appLayout={MyLayout}>
		<Resource name="events" list={EventList} create={EventCreate} edit={EventEdit} options={{ label: 'Мероприятия', menu: "A" }} />
		<Resource name="events-slider" list={EventsSliderList} create={EventsSliderCreate} edit={EventsSliderEdit} options={{ label: 'Слайдер мероприятий', menu: "A" }} />
	</Admin>
);

export default App;