import React from "react";

import {
    List,
    Filter,
    TextInput,
    Datagrid,
    TextField,
    ImageField,
    EditButton,
} from "react-admin";

import {PreviewImage} from ".././";

const PostList = (props) => {
    return (
        <List {...props} pagination={false} title="Посты">
            <Datagrid>
                <EditButton />
                <PreviewImage
                    label="Изображение"
                    source="imageAdmin"
                    sortable={false}
                />
                <TextField label="Заголовок" source="title" sortable={false} />
            </Datagrid>
        </List>
    );
};

export default PostList;
