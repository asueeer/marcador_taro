export const GlobalConstBackgroundImage = 'https://diz.deniffer.com/images/202304/bg.jpg'
export const GlobalConstTitleImage = 'https://diz.deniffer.com/images/202304/title_image.png'
export const GlobalConstStartButton = 'https://diz.deniffer.com/images/202304/cta_start.png'

export const GlobalConstInviteButton = 'https://diz.deniffer.com/images/202304/player_invitation.png'

export const GlobalConstPlayerAvatarWithScore = 'https://diz.deniffer.com/images/202304/player_avatar_frame_with_score.png'

export const GlobalConstPlayground = 'https://diz.deniffer.com/images/202304/bg_frame.png'

export const GlobalConstWaitForOthers = 'https://diz.deniffer.com/images/202304/cta_waiting_for_others.png'

export const GlobalConstDoneButton = 'https://diz.deniffer.com/images/202304/cta_done.png'

export const GlobalConstBlackCircle = 'https://diz.deniffer.com/images/202304/round_success.png'

export const GlobalConstWinner = 'https://diz.deniffer.com/images/202304/winner_crown.png'

export const GlobalConstNewRound = 'https://diz.deniffer.com/images/202304/cta_new_round.png'

export const BaseUrl = 'https://nancy.asueeer.com/marcador'


export const URL = (image) => {
  return `url(${image})`
}

export const node_color_style = (my_team, node, showAnswer) => {
  let style = 'number'
  if (!showAnswer) {
    if (node.hit) {

    }
    if (node.color_show_a === 'grey') {
      style += ' number-normal'
    } else {
      style += ' number-selected'
    }
    if (node.color_show_b === "grey") {
      style += ' number-normal'
    } else {
      style += ' number-selected-by-b'
    }
    return style
  }
  if (my_team === "A") {
    if (node.color_show_a === 'grey') {
      style += ' number-normal'
    } else {
      style += ' number-selected'
    }
  } else {
    if (node.color_show_b === "grey") {
      style += ' number-normal'
    } else {
      style += ' number-selected-by-b'
    }
  }
  return style
}
