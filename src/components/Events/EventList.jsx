import React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
} from "react-admin";

import {PreviewImage} from ".././";

const EventList = (props) => {
    return (
        <List {...props} pagination={false} title="Мероприятия">
            <Datagrid>
                <EditButton />
                <PreviewImage
                    label="Изображение"
                    source="imageAdmin"
                    sortable={false}
                />
                <TextField label="Уникальная ссылка" source="url" sortable={false} />
                <TextField label="Заголовок" source="title" sortable={false} />
            </Datagrid>
        </List>
    );
};

export default EventList;
