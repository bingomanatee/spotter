export function beatImagePaths(beatId) {
  return {
    urlPath: `imageUrl/beats/${beatId}`,
    dataPath: `imageUrl/beats/${beatId}/data`,
    dataHeadersPath: `imageUrl/beats/${beatId}/headers`
  }
}
