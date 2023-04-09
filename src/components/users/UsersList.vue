<template>
  <ul>
    <button @click="confirmInput">Confirm</button>
    <button @click="saveChanges">saveChanges</button>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>

import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      changeSaved: false,
    };
  },
  methods: {
    confirmInput() {
      this.$router.push('./teams');
    },
  },
  beforeRouteEnter(to, from, next) {
    // console.log('UsersList Cmp beforeRouteEnter');
    // console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UsersList Cmp beforeRouteLeave');
    console.log(to, from);

    if (this.changeSaved) {
      next();
    } else {
      const usersWantLeave = confirm('Are You Sure ? You Got Unsaved Changes!');
      next(usersWantLeave);
    }
  },
  unmounted() {
    console.log('unmounted');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
