/* global Promise */
import * as PIXI from 'pixi.js'

const texturesList = [
  // { name: 'rocket',
  //   path: require('../../assets/img/rocket.png')
  // },
  {
    name: 'meteor',
    path: require('../../assets/img/meteor.png')
  }
  // { name: 'boost',
  //   path: require('../../assets/img/boost.png')
  // },
  // { name: 'star',
  //   path: require('../../assets/img/star.png')
  // },
  // { name: 'fuel',
  //   path: require('../../assets/img/fuel.png')
  // },
  // { name: 'arrow',
  //   path: require('../../assets/img/arrow.png')
  // },
  // { name: 'space',
  //   path: require('../../assets/img/bg-space.jpg')
  // }
]

const spritsheets = {}
const textures = {}

const loadTextures = async () => {
  const loader = PIXI.Loader.shared

  // Добавление текстур в лоадер
  for (const texture of texturesList) {
    loader.add(texture.name, texture.path)
  }

  // Начать загрузку и ждать пока все не загрузится
  return await new Promise (resolve => {
    loader.load((loader, resources) => {
      for (const texture of texturesList) {
        const t = resources[texture.name].texture
        spritsheets[texture.name] = new PIXI.Sprite(t)
        textures[texture.name] = t
      }
      resolve()
    })
  })
}

export { loadTextures, spritsheets, textures }
