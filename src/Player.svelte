<script>
  import { playing } from "./utils/player-store";
</script>

{#if $playing.name}
  <p>
    Name: {$playing.name}<br />
    Artist: {$playing.artist}
  </p>
  <audio controls>
    <source src="songs/{$playing.name}.mp3" type="audio/mpeg" />
    Your browser does not support the audio tag.
  </audio>
{:else}
  <p>Select a track to play</p>
{/if}
