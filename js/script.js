

//基準点の準備
var elemTop = [];

//現在地を取得するための設定を関数でまとめる
function PositionCheck(){
    //headerの高さを取得
	var headerH = $("#header").outerHeight(true);
    //.scroll-pointというクラス名がついたエリアの位置を取得する設定
	$(".scroll-point").each(function(i) {//.scroll-pointクラスがついたエリアからトップまでの距離を計算して設定
		elemTop[i] =Math.round(parseInt($(this).offset().top-headerH-10));//追従するheader分の高さからさらに10px分（コンテンツの少し上で現在地にするため）を引く
	});
}

//ナビゲーションに現在地のクラスをつけるための設定
function ScrollAnime() {//スクロールした際のナビゲーションの関数にまとめる
	var scroll = Math.round($(window).scrollTop());
	var NavElem = $("#pc-nav li");//ナビゲーションのliの何番目かを定義するための準備
	$("#pc-nav li").removeClass('current');//全てのナビゲーションの現在地クラスを除去
	if(scroll >= elemTop[0] && scroll < elemTop[1]) {//.scroll-point 1つめ以上.scroll-point 2つめ未満
     $(NavElem[0]).addClass('current');//1つめのliに現在地クラスを付与
    } 
    else if(scroll >= elemTop[1] && scroll < elemTop[2]) {//.scroll-point 2つめ以上.scroll-point 3つめ未満
     $(NavElem[1]).addClass('current');//2つめのliに現在地クラスを付与
    } 
    else if(scroll >= elemTop[2] && scroll < elemTop[3]) {//.scroll-point 3つめ以上.scroll-point 4つめ未満
     $(NavElem[2]).addClass('current');//3つめのliに現在地クラスを付与
    } 
    else if(scroll >= elemTop[3] && scroll < elemTop[4]) {//.scroll-point 4つめ以上.scroll-point 5つめ未満
     $(NavElem[3]).addClass('current');//4つめのliに現在地クラスを付与
    } 
    else if(scroll >= elemTop[4]) {// .scroll-point 5つめ（area-5）以上
      $(NavElem[4]).addClass('current');//5つめのliに現在地クラスを付与
    } 
}

//ナビゲーションをクリックした際のスムーススクロール
$('#pc-nav a,#g-nav a').click(function () {
	var elmHash = $(this).attr('href'); //hrefの内容を取得
	var headerH = $("#header").outerHeight(true);//追従するheader分の高さ（70px）を引く
	var pos = Math.round($(elmHash).offset().top-headerH);	//headerの高さを引き小数点を四捨五入
	$('body,html').animate({scrollTop: pos}, 500);//取得した位置にスクロール※数値が大きいほどゆっくりスクロール
	return false;//リンクの無効化
});



$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});




	$('body').scrollgress({//バーの高さの基準となるエリア指定
		height: '5px',//バーの高さ
		color: '#eb6100',//バーの色
	});



//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
		var scroll = $(window).scrollTop();
		if (scroll >= 200){//上から200pxスクロールしたら
			$('#page-top').removeClass('RightMove');//#page-topについているRightMoveというクラス名を除く
			$('#page-top').addClass('LeftMove');//#page-topについているLeftMoveというクラス名を付与
		}else{
			if(
				$('#page-top').hasClass('LeftMove')){//すでに#page-topにLeftMoveというクラス名がついていたら
				$('#page-top').removeClass('LeftMove');//LeftMoveというクラス名を除き
				$('#page-top').addClass('RightMove');//RightMoveというクラス名を#page-topに付与
			}
		}
}

// #page-topをクリックした際の設定
$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});



//アコーディオンをクリックした時の動作
$('.title').on('click', function() {//タイトル要素をクリックしたら
	$('.box').slideUp(500);//クラス名.boxがついたすべてのアコーディオンを閉じる
    
	var findElm = $(this).next(".box");//タイトル直後のアコーディオンを行うエリアを取得
    
	if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
		$(this).removeClass('close');//クラス名を除去    
	}else{//それ以外は
		$('.close').removeClass('close'); //クラス名closeを全て除去した後
		$(this).addClass('close');//クリックしたタイトルにクラス名closeを付与し
		$(findElm).slideDown(500);//アコーディオンを開く
	}
});




var slider;
var sliderFlag = false;
var breakpoint = 768;//768px以下の場合
  
function sliderSet() {
        var windowWidth = window.innerWidth;
        if (windowWidth >= breakpoint && !sliderFlag) {//768px以上は1行でスライダー表示
            slider = $('.slider').bxSlider({
			mode: 'vertical',//縦スライド指定
			controls: false,//前後のコントロールを表示させない。
			auto: 'true',//自動的にスライド
			pager: false//ページ送り無効化
		});
            sliderFlag = true;
        } else if (windowWidth < breakpoint && sliderFlag) {
            slider.destroySlider();//bxSliderのOptionであるdestroySliderを使用してスライダーの動きを除去
            sliderFlag = false;
        }
    }



// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime(){
  
	
	$('.bgLRextendTrigger').each(function(){ //bgLRextendTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('bgLRextend');// 画面内に入ったらbgLRextendというクラス名を追記
		}else{
			$(this).removeClass('bgLRextend');// 画面外に出たらbgLRextendというクラス名を外す
		}
	});	
    $('.bgappearTrigger').each(function(){ //bgappearTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('bgappear');// 画面内に入ったらbgappearというクラス名を追記
		}else{
			$(this).removeClass('bgappear');// 画面外に出たらbgappearというクラス名を外す
		}
	});

$('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
		}else{
		$(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
		}
		});
	
	// 4-2 パタッ（左へ）
$('.flipLeftTrigger').each(function(){ //flipLeftTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('flipLeft');// 画面内に入ったらflipLeftというクラス名を追記
		}else{
		$(this).removeClass('flipLeft');// 画面外に出たらflipLeftというクラス名を外す
		}
		});
    
}




// 画面をリサイズしたら動かしたい場合の記述
$(window).on('resize', function() {
    sliderSet();//機能編 9-4-1 ニュースティッカーの動きの関数を呼ぶ
});

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	PageTopAnime();
	PositionCheck();
	ScrollAnime();
    fadeAnime();
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load',function(){

    $("#splash-logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述

     //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる  
	$("#splash").delay(1500).fadeOut('slow',function(){//機能編 4-2-1 背景色が伸びる（下から上）が動作した後に下記アニメーションを実行
        $('body').addClass('appear');
        sliderSet();
        PositionCheck();
        ScrollAnime();//機能編 5-1-26 追従メニューの現在地ハイライトの関数を呼ぶ
        PageTopAnime();//機能編  8-1-3	ページの指定の高さを超えたら右から出現する関数を呼ぶ

    
	$(".open").each(function(index, element){	//openクラスを取得
		var Title =$(element).children('.title');	//openクラスの子要素のtitleクラスを取得
		$(Title).addClass('close');				///タイトルにクラス名closeを付与し
		var Box =$(element).children('.box');	//openクラスの子要素boxクラスを取得
		$(Box).slideDown(500);					//アコーディオンを開く
	});
        
    });
    
    //=====ここから背景が伸びた後に動かしたいJSをまとめる   
    $('.splashbg').on('animationend', function() {        
        fadeAnime();//印象編 4 最低限おぼえておきたい動きの関数を呼ぶ
    });  
    //=====ここまで背景が伸びた後に動かしたいJSをまとめる
	
});

// 関連記事

const relatedArticles = [
	{
			title: '習慣化のコツとは？習慣化のメリットと失敗の原因を解説',
			summary: '習慣化のコツを記事です',
			link: 'https://go.chatwork.com/ja/column/efficient/efficient-543.html'
	},
	{
			title: '筋トレを習慣にできない理由と習慣化するための6つの方法を徹底解説',
			summary: '筋トレをなかなか習慣にできない、あなたは今、筋トレを習慣にしたいと悩んでいませんか？その悩みに手助けしてくれる記事です。',
			link: 'https://minchalle.com/blog/how-to-continue-muscle-training'
	},
	{
			title: '最新研究でわかった、筋合成が最も高まる8つの摂取方法',
			summary: '少し前の記事ですが面白いので見てください！',
			link: 'https://tarzanweb.jp/post-187666'
	},
	{
			title: 'Tarzan',
			summary: '自分がよく見ているサイトでためになる情報も多いのでお勧めです。',
			link: 'https://tarzanweb.jp/'
	},
	// 他の関連記事データを追加
];

const articlesContainer = document.querySelector('.articles-container');

relatedArticles.forEach(article => {
	const articleDiv = document.createElement('div');
	articleDiv.classList.add('article');
	articleDiv.innerHTML = `
			<h3><a href="${article.link}">${article.title}</a></h3>
			<p>${article.summary}</p>
	`;
	articlesContainer.appendChild(articleDiv);
});
