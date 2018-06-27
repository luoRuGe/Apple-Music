export const singer = function(state){
    return state.singer
}
export const playing = function(state){
    return state.playing
}
export const fullScreen = function(state){
    return state.fullScreen
}
export const playList = function(state){
    return state.playList
}
export const sequenceList = function(state){
    return state.sequenceList
}
export const currentIndex = function(state){
    return state.currentIndex
}
export const mode = function(state){
    return state.mode
}
export const currentSong = function(state){
    return state.playList[state.currentIndex]
}