export interface FriendItem {
  uuid: string
  name: string
  status: string
}

export default function () {
  const friends = ref<FriendItem[]>([
    { uuid: '378ae97b-d6c6-4ec4-bf39-2aaae75bd514', name: 'Alice', status: 'Feeling happy and available.' },
    { uuid: '86b765de-b5ef-4334-a040-28bd1a46c5ad', name: 'Bob', status: 'Currently busy at work.' },
    { uuid: '1a7895ee-d744-4f81-9aa9-c16f14463232', name: 'Charlie', status: 'Taking a quick break.' },
    { uuid: '5857f77a-f5cc-410c-9871-1d5651427d96', name: 'David', status: 'In a meeting, please text later.' },
    { uuid: '4fd8a65d-de60-43ed-89bd-343359c9989f', name: 'Eve', status: 'Out for a walk, back soon.' },
  ])

  return { friends }
}
