import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.MD에 작성될 페이지 텍스트
 */

let text = `# 📕 Latest Blog Posts

`;

const parser = new Parser({
    headers: {
        Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
    },
});

(async () => {

    const feed = await parser.parseURL("https://lucy-devblog.tistory.com/rss");

    text += `<ul>`;

    for (let i = 0; i < 15; i++){
        const {title, link, pubDate} = feed.items[i];
        const formattedDate = new Date(pubDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        console.log(`게시 날짜: ${formattedDate}`);
        
        text += `<li><a href='${link}' target='_blank'>${formattedDate} - ${title}</a></li>`;
    }

    text += `</ul>`;

    writeFileSync("README.md", text, "utf8", (e) => {
        console.log(e);
    });
    
    console.log('업데이트 완료');
})();
