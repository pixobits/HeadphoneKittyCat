<script>
  const tracks = Array(10).fill(0);
</script>

{#each tracks as track, i}
  <div class="track">
    <p class="number">{i + 1}</p>
    <div class="content">
      <p class="name">Name</p>
      <p class="artist">Artist</p>
    </div>
    <div class="btn"><u>Buy</u></div>
  </div>
{/each}

<style>
  .track {
    display: flex;
    flex-direction: row;
    padding: 10px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    margin-bottom: 10px;
    border-radius: 8px;
    align-items: center;
  }

  .number {
    flex-grow: 0;
    padding: 10px;
    border-radius: 100%;
    margin-left: 10px;
    height: 0;
    width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
  }

  .content {
    flex-grow: 1;
    margin-left: 20px;
  }

  .name {
    color: rgba(0, 0, 0, 0.9);
    font-size: 18px;
    margin: 0 0 5px 0;
    padding: 0;
  }

  .artist {
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    margin: 0;
    padding: 0;
  }

  .btn {
    padding: 8px;
    margin-right: 10px;
    cursor: pointer;
  }
</style>
