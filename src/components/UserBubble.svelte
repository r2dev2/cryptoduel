<script>
  import { AvatarBeam } from 'svelte-boring-avatars';

  export let name = '';
  export let size = 36;
</script>

<div class="user-bubble" title={name}>
  <AvatarBeam
    {size}
    {name}
    colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
  />
</div>

<style>
  .user-bubble {
    width: max-content;
  }
</style>
