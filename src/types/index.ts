export interface AuthToken {
  userId: string
}

export type PostTrackHeaders = {
  authorization: string
}

export type PostTrackBody = {
  location: {
    coords: {
      latitude: 37.35667204
      longitude: -122.11636489
    }
    timestamp: string
  }
}
