namespace SpriteKind {
    export const BackGround_Image = SpriteKind.create()
    export const Keycard1 = SpriteKind.create()
    export const Machine = SpriteKind.create()
    export const Keycard2 = SpriteKind.create()
    export const Keycard3 = SpriteKind.create()
    export const Keycard4 = SpriteKind.create()
    export const Keycard5 = SpriteKind.create()
    export const Upgrade_Item = SpriteKind.create()
    export const Spores = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Keycard2, function (sprite, otherSprite) {
    sprites.destroy(KeyCard2)
    protagonist.sayText("lvl 2", 2000, false)
    tiles.setWallAt(tiles.getTileLocation(123, 112), false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Keycard5, function (sprite, otherSprite) {
    sprites.destroy(Omni_key)
    protagonist.sayText("omni", 2000, false)
    tiles.setWallAt(tiles.getTileLocation(148, 112), false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Keycard1, function (sprite, otherSprite) {
    sprites.destroy(KeyCard1)
    Upgradability = 1
    protagonist.sayText("lvl 1", 2000, false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Keycard4, function (sprite, otherSprite) {
    sprites.destroy(KeyCard4)
    protagonist.sayText("lvl 4", 2000, false)
    tiles.setWallAt(tiles.getTileLocation(71, 130), false)
})
function PowerFluctuation (Power: boolean) {
    if (PowerAble == 1) {
        multilights.toggleLighting(false)
    } else if (PowerAble == 0) {
        multilights.toggleLighting(true)
    }
}
function jumpscare () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.BackGround_Image)
    sprites.destroyAllSpritesOfKind(SpriteKind.Keycard1)
    sprites.destroyAllSpritesOfKind(SpriteKind.Machine)
    sprites.destroyAllSpritesOfKind(SpriteKind.Keycard2)
    sprites.destroyAllSpritesOfKind(SpriteKind.Keycard3)
    sprites.destroyAllSpritesOfKind(SpriteKind.Keycard4)
    sprites.destroyAllSpritesOfKind(SpriteKind.Keycard5)
    sprites.destroyAllSpritesOfKind(SpriteKind.Upgrade_Item)
    tiles.setCurrentTilemap(tilemap`jumpscare_level`)
    scene.setBackgroundImage(assets.image`scary`)
    game.showLongText("You've Been Killed", DialogLayout.Center)
}
function Upgrade_ItemCheck () {
    if (protagonist.overlapsWith(Upgrade_item1)) {
        sprites.destroy(Upgrade_item1)
        Upgradability = 2
    } else if (protagonist.overlapsWith(Upgrade_item2)) {
        sprites.destroy(Upgrade_item2)
        Upgradability = 3
    } else if (protagonist.overlapsWith(Upgrade_item3)) {
        sprites.destroy(Upgrade_item3)
        Upgradability = 4
    }
}
function UpgradeSystem () {
    if (Upgradability == 1) {
        tiles.placeOnRandomTile(KeyCard2, assets.tile`Output_tile`)
        PowerAble = 0
        PowerFluctuation(true)
    } else if (Upgradability == 2) {
        tiles.placeOnRandomTile(KeyCard3, assets.tile`Output_tile`)
        PowerAble = 1
        PowerFluctuation(true)
    } else if (Upgradability == 3) {
        tiles.placeOnRandomTile(KeyCard4, assets.tile`Output_tile`)
        PowerAble = 0
        PowerFluctuation(true)
    } else if (Upgradability == 4) {
        tiles.placeOnRandomTile(Omni_key, assets.tile`Output_tile`)
        PowerAble = 1
        PowerFluctuation(true)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Spores, function (sprite, otherSprite) {
    Infection_Mechanic()
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    jumpscare()
})
function Awakening_Cutscene () {
    scene.setBackgroundImage(assets.image`City_NotDestroyed`)
    game.showLongText("It was a normal day in the city", DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`Lab_Incident`)
    game.showLongText("Until...", DialogLayout.Top)
    scene.setBackgroundImage(assets.image`Plant_Mutation`)
    pause(500)
    scene.setBackgroundImage(assets.image`Plant_Mutation2`)
    pause(500)
    scene.setBackgroundImage(assets.image`InfectionScene`)
    HumanCutscene = sprites.create(assets.image`Daishckds_cutscene`, SpriteKind.Player)
    HumanCutscene.setPosition(128, 111)
    InfectedCutscene = sprites.create(assets.image`turned_small`, SpriteKind.Player)
    InfectedCutscene.setPosition(28, 111)
    story.spriteMoveToLocation(InfectedCutscene, 128, 111, 75)
    pause(1000)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    scene.setBackgroundImage(assets.image`InfectionScene2`)
    InfectedCutscene = sprites.create(assets.image`turned_small`, SpriteKind.Player)
    InfectedCutscene.setPosition(128, 111)
    INfectedCutscene2 = sprites.create(assets.image`turned_small`, SpriteKind.Player)
    INfectedCutscene2.setPosition(145, 111)
    pause(500)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    scene.setBackgroundImage(assets.image`City_Turned`)
    pause(1000)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Upgrade_Item, function (sprite, otherSprite) {
    Upgrade_ItemCheck()
})
function Infection_Mechanic () {
    Infection_Locations = tiles.getTilesByType(assets.tile`budding_tile`)
    // Make a list of random velocities for enemies then change them depending on lights on or off
    for (let index = 0; index < 20; index++) {
        Infected = sprites.create(assets.image`Spores`, SpriteKind.Spores)
        tiles.placeOnTile(Infected, Infection_Locations.removeAt(randint(0, Infection_Locations.length - 1)))
        Infected.setVelocity(5, 5)
        Infected.follow(protagonist, 5)
    }
    Infection_LVL = 0
    if (Infection_LVL == 0) {
        Infection_LVL = 1
    } else if (Infection_LVL == 1) {
        Infection_LVL = 2
    } else if (Infection_LVL == 2) {
        Infection_LVL = 3
        protagonist = sprites.create(assets.image`delete now`, SpriteKind.Player)
    } else if (Infection_LVL == 3) {
        Infection_LVL = 4
    } else if (Infection_LVL == 4) {
        Infection_LVL = 5
    }
}
function TurnedEnemySpawning () {
    SpawnLocations = tiles.getTilesByType(assets.tile`budding_tile`)
    // Make a list of random velocities for enemies then change them depending on lights on or off
    for (let index = 0; index < 20; index++) {
        Enemy_sprites = sprites.create(Turned_EnemyImages._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(Enemy_sprites, SpawnLocations.removeAt(randint(0, SpawnLocations.length - 1)))
        Enemy_sprites.setVelocity(25, 25)
        Enemy_sprites.follow(protagonist, 25)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Keycard3, function (sprite, otherSprite) {
    sprites.destroy(KeyCard3)
    protagonist.sayText("lvl 3", 2000, false)
    tiles.setWallAt(tiles.getTileLocation(78, 112), false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`target_tile`, function (sprite, location) {
    UpgradeSystem()
})
function OutriderSpawning () {
    Outrider_locations = tiles.getTilesByType(assets.tile`fully_grown_flower`)
    // Make a list of random velocities for enemies then change them depending on lights on or off
    for (let index = 0; index < 10; index++) {
        Outriders = sprites.create(assets.image`Outrider`, SpriteKind.Enemy)
        tiles.placeOnTile(Outriders, Outrider_locations.removeAt(randint(0, Outrider_locations.length - 1)))
        Outriders.setVelocity(75, 75)
        Outriders.follow(protagonist, 75)
    }
    Outrider_locations2 = tiles.getTilesByType(assets.tile`fully_grown_flower0`)
    // Make a list of random velocities for enemies then change them depending on lights on or off
    for (let index = 0; index < 10; index++) {
        Outriders = sprites.create(assets.image`Outrider`, SpriteKind.Enemy)
        tiles.placeOnTile(Outriders, Outrider_locations2.removeAt(randint(0, Outrider_locations2.length - 1)))
        Outriders.setVelocity(75, 75)
        Outriders.follow(protagonist, 75)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -5
})
let Outrider_locations2: tiles.Location[] = []
let Outriders: Sprite = null
let Outrider_locations: tiles.Location[] = []
let Enemy_sprites: Sprite = null
let SpawnLocations: tiles.Location[] = []
let Infection_LVL = 0
let Infected: Sprite = null
let Infection_Locations: tiles.Location[] = []
let INfectedCutscene2: Sprite = null
let InfectedCutscene: Sprite = null
let HumanCutscene: Sprite = null
let statusbar: StatusBarSprite = null
let Upgrade_item3: Sprite = null
let Upgrade_item2: Sprite = null
let Upgrade_item1: Sprite = null
let Upgradability = 0
let Omni_key: Sprite = null
let KeyCard4: Sprite = null
let KeyCard3: Sprite = null
let KeyCard2: Sprite = null
let KeyCard1: Sprite = null
let Turned_EnemyImages: Image[] = []
let PowerAble = 0
let protagonist: Sprite = null
Awakening_Cutscene()
scene.setBackgroundImage(assets.image`acid_background`)
tiles.setCurrentTilemap(tilemap`The_Main_Level`)
protagonist = sprites.create(assets.image`Prisoner_9341`, SpriteKind.Player)
tiles.placeOnRandomTile(protagonist, assets.tile`bed`)
scene.cameraFollowSprite(protagonist)
controller.moveSprite(protagonist, 175, 175)
PowerAble = 1
multilights.addLightSource(protagonist, 10)
PowerFluctuation(true)
Turned_EnemyImages = [assets.image`turned_large`, assets.image`turned_small`, assets.image`PlunderCrawler`]
TurnedEnemySpawning()
OutriderSpawning()
Infection_Mechanic()
KeyCard1 = sprites.create(assets.image`Keycard1`, SpriteKind.Keycard1)
KeyCard2 = sprites.create(assets.image`Keycard2`, SpriteKind.Keycard2)
KeyCard3 = sprites.create(assets.image`Keycard3`, SpriteKind.Keycard3)
KeyCard4 = sprites.create(assets.image`Keycard4`, SpriteKind.Keycard4)
Omni_key = sprites.create(assets.image`Omni_key`, SpriteKind.Keycard5)
tiles.placeOnRandomTile(KeyCard1, assets.tile`Dead_turned_small`)
let Upgrade_Machine = sprites.create(assets.image`Upgrade_machine`, SpriteKind.Machine)
tiles.placeOnTile(Upgrade_Machine, tiles.getTileLocation(11, 99))
Upgradability = 0
Upgrade_item1 = sprites.create(assets.image`Upgrade_token1`, SpriteKind.Upgrade_Item)
tiles.placeOnTile(Upgrade_item1, tiles.getTileLocation(127, 108))
Upgrade_item2 = sprites.create(assets.image`Upgrade_token2`, SpriteKind.Upgrade_Item)
tiles.placeOnRandomTile(Upgrade_item2, assets.tile`dead_scientist`)
Upgrade_item3 = sprites.create(assets.image`Upgrade_token3`, SpriteKind.Upgrade_Item)
tiles.placeOnTile(Upgrade_item3, tiles.getTileLocation(74, 134))
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.value = 1500
statusbar.attachToSprite(protagonist)
