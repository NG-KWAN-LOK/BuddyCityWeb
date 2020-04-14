Gitbub page = https://ng-kwan-lok.github.io/BuddyCityWeb/
以下為網頁之結構，請先細閱。

必須於vs code 下載 以下plugins:
1.Live Server [在save時自動刷新瀏覽器]
2.Live Sass Compiler [巢狀架構之css，增加可讀性，語法與css一樣，可以參考已有的檔案。]
  ->>使用scss時，於視窗最低部藍色bar有 Watch Sass 的按鈕，按一下 Watching 代表開啟scss compiler
3.SCSS Formatter [自動排位]
  ->>在Settings search ->Format On Save，打勾。表示VS code會在save時自己啟用Formatter。(VS code沒有自帶SCSS的Formatter，必須自己下載)

網頁參考網站：https://osaka-info.jp/
            https://web.archive.org/web/20170901153842/http://www.osaka-info.jp/jp

這個網頁本來是參考osaka-info的舊版UI，但現在人家的網頁更新了，我們就做新舊版的混合版吧!
本來這個網頁是參考以上兩個網站，但因為我手殘不想全抄，結果老師給了我很多建議，而老師所建議我們要改的樣子不約而同地跟以上兩個網頁的排版差不多，
所以我們決定把這兩個網頁做一個mix版。

網頁之結構
>>為目錄 ->為檔案

  >>image [放圖]
  >>js [javascript]
  ->index.html [mainpage]
  ->style.scss [mainpage之scss，此為有巢狀架構之css，增加可讀性]
  ->style.css [mainpage之css，是由scss自動生成的檔案，不可修改]
  ->style.css.map [mainpage之scss自動生成的檔案，不可修改]
  
  >>building_list [building_list page]
    ->index.html [building_list mainpage]
    ->building.html [subpage]
    ->style.scss [building_list之scss，此為有巢狀架構之css，增加可讀性]
    ->style.css [building_list之css，是由scss自動生成的檔案，不可修改]
    ->style.css.map [building_list之scss自動生成的檔案，不可修改]
    
  >>resident [resident page]
    ->index.html [resident mainpage]
    ->building.html [subpage]
    ->style.scss [resident之scss，此為有巢狀架構之css，增加可讀性]
    ->style.css [resident之css，是由scss自動生成的檔案，不可修改]
    ->style.css.map [resident之scss自動生成的檔案，不可修改]
    
