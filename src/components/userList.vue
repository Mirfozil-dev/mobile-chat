<template>
    <q-list separator>
        <user-list-item
            v-for="(user, key) in users"
            :userId="key"
            :user="user"
         />
    </q-list>
</template>

<script>
import userListItem from 'src/components/userListItem';

export default {
    name: 'userList',
    components: {
        userListItem,
    },
    props: {
        users: {
            type: Object,
            isRequired: true,
        }
    }
}
</script>
