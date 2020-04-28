### Gitbub page = https://ng-kwan-lok.github.io/BuddyCityWeb/ ###

## 網頁之結構 ##
* mainpage 主頁
  * Top nav
    * Menu
      * *online_map [網上地圖，連到互聯網]*
      * 城市建築物名冊一覽表
        * 以popup 形式顯示每個城市建築物名的資料
      * 居民名冊
        * 以popup 形式顯示每個玩家的資料
      * Buddy市觀光局 [未完成]
        * Buddy市觀光局的介紹
    * Language
      * 正體中文
      * 英文 [未完成]
      * 日本文 [未完成]
  * main
    * Discovery Buddy市的基本資料
    * Reality Project 風景畫廊
  * footer
    * BUDDY CITY旅遊局紹介[未完成]
      * Buddy市觀光局的介紹
  * 服務條款 [未完成]
    * 服務條款及使用細則
  * Dynmap
    * 網頁地圖核心引擎
     

## 目錄之結構 ##
* ./
  * image [放main page圖]
  * js [放javascript]
  * top&footer_css [放top和footer的css]
    * fonts[為文件夾,裡面是ionicons的圖的檔案]
    * top&fotter_style.css[top&fotter_style之css，是由scss自動生成的檔案，不可修改]
    * top&fotter_style.scss [top&fotter_style之scss，此為有巢狀架構之css，增加可讀性]
    * top&fotter_style.css [top&fotter_style之css，是由scss自動生成的檔案，不可修改]
    * top&fotter_style.css.map [top&fotter_style之scss自動生成的檔案，不可修改]
  * **index.html [mainpage]**
  * style.scss [mainpage之scss，此為有巢狀架構之css，增加可讀性]
  * style.css [mainpage之css，是由scss自動生成的檔案，不可修改]
  * style.css.map [mainpage之scss自動生成的檔案，不可修改]

  * building_list [building_list page]
    * **index.html [building_list mainpage]**
    * style.scss [building_list之scss，此為有巢狀架構之css，增加可讀性]
    * style.css [building_list之css，是由scss自動生成的檔案，不可修改]
    * style.css.map [building_list之scss自動生成的檔案，不可修改]
    * image[放building list page圖]

  * resident [resident page]
    * **index.html [resident mainpage]**
    * style.scss [resident之scss，此為有巢狀架構之css，增加可讀性]
    * style.css [resident之css，是由scss自動生成的檔案，不可修改]
    * style.css.map [resident之scss自動生成的檔案，不可修改]
    * image[放resident page圖]
    
  * ***map.html [線上地圖，聯到互聯網]***
  
  * *page [其他頁面 連到互聯網]*
    * ***bcctb-about-us.html [Buddy市觀光局 About Us，連到互聯網]***
    * ***tnc.html [服務條款及使用細則，連到互聯網]***
