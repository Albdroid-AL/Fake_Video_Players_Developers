class HlsParser {
  constructor(inputUrl) {
    this.inputUrl = inputUrl;
    this.isVod = false;
    this.tags = [];
    this.chunksNumber = 0;
    this.m3u8s = [];

    this.readFile(this.inputUrl);
  }

  async readFile(url) {
    const blob = await fetch(url)
      .then((result) => result.blob())
      .catch((error) => {
        console.log(error);
      });
    this.processFile(blob);
  }

  processFile(blob) {
    let parser_ = this;

    let currentTags = [];
    let currentM3u8s = [];

    const reader = new FileReader();
    reader.onload = function(event) {
      currentTags = event.target.result.split('\n');

      if (currentTags.find((item) => item.includes('#EXT-X-PLAYLIST-TYPE:VOD'))) {
        parser_.isVod = true;
      }

      if (currentTags.filter((item) => item.includes('.m3u8'))) {
        currentM3u8s = currentTags.filter((item) => item.includes('.m3u8')).map((item) => {
          return parser_.inputUrl.replace(parser_.inputUrl.split('/').pop(), item);
        });
      }

      parser_.countChunks(currentTags);
      parser_.tags.push(
        ...currentTags.map((item) => item.split(':')[0]).filter((item) => item.includes('#')));

      if (currentM3u8s.length) {
        const index = [...parser_.m3u8s].length;
        parser_.m3u8s.push(...currentM3u8s);

        for (let i = index; i < parser_.m3u8s.length; i++) {
          parser_.readFile(parser_.m3u8s[i]);
        }
      }
    };
    reader.readAsText(blob);
  }

  countChunks(tags) {
    let parser_ = this;
    parser_.chunksNumber += tags.filter((item) => {
      return item.match(/#EXTINF/);
    }).length;
  }
}
