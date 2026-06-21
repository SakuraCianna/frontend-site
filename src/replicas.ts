export interface ReplicaPreview {
  id: number
  fileName: string
  route: string
  coverUrl?: string
}

const coverExtensionPriority = ['avif', 'webp', 'png', 'jpg', 'jpeg'] as const

type CoverExtension = (typeof coverExtensionPriority)[number]

const replicaFilePattern = /(?:^|[\\/])([1-9]\d*)\.vue$/
const coverFilePattern = /(?:^|[\\/])assets[\\/]([1-9]\d*)[\\/]cover\.(avif|webp|png|jpg|jpeg)$/i

const coverPriority = new Map<CoverExtension, number>(
  coverExtensionPriority.map((extension, index) => [extension, index]),
)

interface CoverCandidate {
  id: number
  extension: CoverExtension
  url: string
}

export function getReplicaIdFromPath(path: string): number | undefined {
  const id = Number(path.match(replicaFilePattern)?.[1])

  return Number.isInteger(id) && id > 0 ? id : undefined
}

export function createReplicaPreviews(
  pagePaths: string[],
  coverEntries: Array<[string, string]>,
): ReplicaPreview[] {
  return pagePaths
    .map((path) => getReplicaIdFromPath(path))
    .filter((id): id is number => id !== undefined)
    .sort((left, right) => left - right)
    .map((id) => ({
      id,
      fileName: `${id}.vue`,
      route: `/${id}`,
      coverUrl: resolveCoverUrl(id, coverEntries),
    }))
}

export function resolveCoverUrl(
  id: number,
  coverEntries: Array<[string, string]>,
): string | undefined {
  return coverEntries
    .map(([path, url]) => createCoverCandidate(path, url))
    .filter((cover): cover is CoverCandidate => cover?.id === id)
    .sort(
      (left, right) =>
        (coverPriority.get(left.extension) ?? Number.MAX_SAFE_INTEGER) -
        (coverPriority.get(right.extension) ?? Number.MAX_SAFE_INTEGER),
    )[0]?.url
}

function createCoverCandidate(path: string, url: string): CoverCandidate | undefined {
  const match = path.match(coverFilePattern)
  const id = Number(match?.[1])
  const extension = match?.[2]?.toLowerCase() as CoverExtension | undefined

  if (!Number.isInteger(id) || id <= 0 || !extension || !coverPriority.has(extension)) {
    return undefined
  }

  return {
    id,
    extension,
    url,
  }
}
