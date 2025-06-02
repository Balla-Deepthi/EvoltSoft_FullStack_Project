<template>
  <div class="home-container">
    <h1>Welcome to Gas Station Locator</h1>
    <div class="auth-buttons">
      <router-link to="/login" class="btn">Login</router-link>
      <router-link to="/register" class="btn">Register</router-link>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  padding: 2rem;
}

.auth-buttons {
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>