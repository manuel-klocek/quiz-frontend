<script lang="ts">
import Swal from 'sweetalert2'

export default {
  name: "ToastComponent.vue",
  Toast: Swal.mixin(
      {
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      }
  )
}
</script>