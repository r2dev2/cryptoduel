<script>
  import { AvatarBeam } from 'svelte-boring-avatars';

  export let name = '';
  export let size = 16;
</script>

<div class="user-bubble" title={name} style="--size: {size}px;">
  <AvatarBeam
    {size}
    {name}
    colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
  />
</div>

<style>
  .user-bubble {
    width: var(--size);
    height: var(--size);
  }
</style>
