# bbHackathon

# Instalation
	ionic platform add android
	ionic serve 				(for browser)
	ionic run android			(for android device)



Банка = Комерцијална
Клиент на Банка = H&M


1. H&M се претплаќа на Комерцијална за на нејзините корисници ги понуди најпродаваните продукти со намалена цена
2. Комерцијална бара од нас да го додадеме Виџетот на нејзината платформа
3. Клиентот на комерцијална го користи виџетот и гледа дека во близина има продавница на H&M која е во соработка со Комерцијална банка
4. Клиентот има преглед на попусти понудени од H&M и дополнителни попусти понудени од Комерцијална банка
5. Клиентот пазарува во H&M
	- H&M заработува со купениот продукт
	- Комерцијална банка заработува со дел од трансакцијата која е извршена со купување на продуктот

#Бизнис добивка:
	1. H&M се таргетира кон корисниците на Банката на која се претплаќа (Комерцијална) и со тоа зголемува можност за профит
	2. BB заработува со продавање на виџетот на конкретна банка (Комерцијална)


#Фичери:
	- GPS лоцирање и наоѓање на најблиските дуќани (претплатници на Комерцијална) - geofences 
	- Периодични push нотификации за попусти во дуќани во близина
	- За лојални корисници на Комерцијална, самата банка ќе нуди дополнителен попуст на каталогот од H&M (Пример: блуза е 1000 денари. H&M нуди попуст од 20% и чини 800 денари. Комерцијална за лојален купувач нуди дополнителни 10% и чини толку-и-толку (720%). Тоа што фали до 800 го покрива банката.)
	
		

#Бекенд логика:
	- Периодично да праќа нотификации до корисникот за попусти во близина (хардкодирани информации за однапред избрани продавници без никаква логика во позадина)
	- H&M според трансакциите гради логика кои продукти им се најпродавани и за нив дава попуст. Експорт прави на .json фајл со попуст до Комерцијална и банката податоците ги нуди во виџетот. (не не интересира како до нас доаѓа инпортот)
	- Нема да користиме geofences ниту па ќе се пресметува што има корисникот во близина според GPS координати

#Фронтенд логика:
		- Закуцана геолокјација на мапа со пинови во непосредна близина
		- Хардкодирани информации за продавници и поставување пинови на мапа
		- Хардкодирани информации за категории на продавници
		- Хардкодирани информации за попусти по продавници (исти податоци како на бекенд)

#Data models
category: {
		id,
		name,
		iconSrc,
		color,
		isSelected
}
		
product: {
		id,
		storeId,
		name,
		description,
		imageSrc,
		regularPrice,
		discount
}
		
store: {
		id,
		name,
		geoLocation: {
			lat,
			lng
		},
		categoryId,
		information: {
			website,
			phone,
			address,
			workingHours
		}
}
