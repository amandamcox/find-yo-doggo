// Since the data doesn't change, ran this file offline with Node to generate the filter data needed without making api calls.
const axios = require('axios')
const fs = require('fs')

let dogDataFilterSchema = {
	dogDataByFilters: {
		sizes: {
			toy: [],
			small: [],
			medium: [],
			large: [],
			xl: [],
		},
		characteristics: {},
	},
}

const callFirstDogApi = async () => {
	try {
		const firstDogDataResponse = await axios.get(
			'https://api.thedogapi.com/v1/breeds'
		)
		return firstDogDataResponse.data
	} catch (error) {
		console.log(error)
	}
}

const callSecondDogApi = async dogId => {
	try {
		const imageDogDataResponse = await axios.get(
			'https://api.thedogapi.com/v1/images/search',
			{
				params: {
					breed_ids: dogId.id,
					limit: 1,
					order: 'Random',
					size: 'small',
				},
			}
		)
		return imageDogDataResponse.data.length === 0
			? 'no image'
			: imageDogDataResponse.data
	} catch {
		return 'no image'
	}
}

const categorizeSize = weightData => {
	let highRange = weightData.split(' - ').pop()
	if (highRange <= 12) {
		return 'toy'
	} else if (highRange > 12 && highRange <= 25) {
		return 'small'
	} else if (highRange > 25 && highRange <= 50) {
		return 'medium'
	} else if (highRange > 50 && highRange <= 100) {
		return 'large'
	} else if (highRange > 100) {
		return 'xl'
	}
}

const compileAllDogData = async () => {
	const allData = await callFirstDogApi()
	const allDogData = await Promise.all(
		allData.map(async eachDog => {
			let imageData = await callSecondDogApi(eachDog)
			if (imageData === 'no image') {
				let specifics = {
					id: eachDog.id,
					breed: eachDog.name,
					weight: eachDog.weight.imperial,
					height: eachDog.height.imperial,
					life: eachDog.life_span,
					characteristics: eachDog.temperament,
					size: categorizeSize(eachDog.weight.imperial),
				}
				return specifics
			} else {
				let specifics = {
					id: eachDog.id,
					breed: eachDog.name,
					weight: eachDog.weight.imperial,
					height: eachDog.height.imperial,
					life: eachDog.life_span,
					characteristics: eachDog.temperament,
					size: categorizeSize(eachDog.weight.imperial),
					image: imageData[0].url,
				}
				return specifics
			}
		})
	)
	writeFiles('all', allDogData)
}

const compileAllFilterData = async () => {
	const allData = await callFirstDogApi()
	await sortSizes(allData)
	await sortCharacteristics(allData)
	writeFiles('filter')
}

const sortSizes = data => {
	const sizeObject = dogDataFilterSchema.dogDataByFilters.sizes
	data.map(each => {
		let highRange = each.weight.imperial.split(' - ').pop()
		if (highRange <= 12) {
			sizeObject.toy.push(each.name)
		} else if (highRange > 12 && highRange <= 25) {
			sizeObject.small.push(each.name)
		} else if (highRange > 25 && highRange <= 50) {
			sizeObject.medium.push(each.name)
		} else if (highRange > 50 && highRange <= 100) {
			sizeObject.large.push(each.name)
		} else if (highRange > 100) {
			sizeObject.xl.push(each.name)
		}
	})
}

const sortCharacteristics = data => {
	const multipleArrCharacteristics = data.map(each => {
		if (each.temperament) {
			return (eachArr = each.temperament.split(', '))
		}
	})
	const singleArrCharacteristics = [].concat.apply(
		[],
		multipleArrCharacteristics
	)
	let uniqueCharacteristics = [...new Set(singleArrCharacteristics)]

	const charObj = uniqueCharacteristics.map(eachChar => {
		let listOfMatchingDogs = data
			.filter(el => el.temperament && el.temperament.indexOf(eachChar) !== -1)
			.map(eachMatch => eachMatch.name)
		dogDataFilterSchema.dogDataByFilters.characteristics[
			eachChar
		] = listOfMatchingDogs
	})
}

const writeFiles = (fileType, dataToWrite = null) => {
	if (fileType === 'filter') {
		const json = JSON.stringify(dogDataFilterSchema, null, 4)
		fs.writeFile('dogDataByFilters.json', json, 'utf8', () => {
			console.log('Saved dogDataByFilters.json to project folder')
		})
	} else if ((fileType = 'all')) {
		const json = JSON.stringify(dataToWrite, null, 4)
		fs.writeFile('allDogData.json', json, 'utf8', () => {
			console.log('Saved allDogData.json to project folder')
		})
	}
}

compileAllDogData()
compileAllFilterData()
