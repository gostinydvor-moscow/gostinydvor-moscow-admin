import React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
} from "react-admin";

import {PreviewImage} from ".././";

const EventsSliderList = (props) => {
    return (
        <List {...props} pagination={false} title="Слайдер мероприятий">
            <Datagrid>
                <EditButton />
                <PreviewImage
                    label="Изображение"
                    source="imageAdmin"
                    sortable={false}
                />
            </Datagrid>
        </List>
    );
};

export default EventsSliderList;
