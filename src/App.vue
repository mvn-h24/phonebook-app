<template>
  <phone-book></phone-book>
  <error-notification />
</template>

<style src="./tailwind.css" />
<script>
import PhoneBook from "@app/components/phone-book.vue";
import ErrorNotification from "@app/components/Notifications/error-notification.vue";

export default {
  components: { PhoneBook, ErrorNotification },
};
</script>
