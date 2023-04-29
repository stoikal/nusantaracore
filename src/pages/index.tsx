import Image from 'next/image'
import { Inter } from 'next/font/google'
import { supabase } from './../lib/supabaseClient'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

type Artist = {
  id: number
  name: string
}

type Album = {
  id: number
  title: string
  artists: Artist[]
  is_highlighted: boolean
  year: number | null
  youtube: string | null
  spotify: string | null
  apple: string | null
}

type Group = {
  id: number
  title: string
  albums: Album[]
}

type Props = {
  groups: Group[]
}

export default function Home({ groups }: Props) {
  useEffect(() => {
    console.log('===~groups~===', groups)
  }, [groups])

  return (
    <main

    >
      <div>
        {
          groups.map((group) => (
            <div key={group.id}>
              <h3 className="mb-2">{group.title}</h3>
              <ul className="mb-5">
                {
                  group.albums.map((album) => (
                    <li
                      key={group.id + album.id}
                      className="pl-6"
                    >
                      <span className={album.is_highlighted ? 'font-bold' : ''}>
                        <span>
                          {album.title}
                        </span>
                        <span> - </span>
                        <span>
                          {album.artists.map(artist => artist.name).join(', ') || 'n/a'}
                        </span>
                        {
                          album.year && <span> ({ album.year })</span>
                        }
                      </span>
                      {
                        album.youtube && <a href={album.youtube} className=" text-blue-800">&nbsp;<span className="underline">youtube</span></a>
                      }
                      {
                        album.spotify && <a href={album.spotify} className=" text-blue-800">&nbsp;<span className="underline">spotify</span></a>
                      }
                      {/* {
                        album.apple && <a href={album.apple} className=" text-blue-800">&nbsp;<span className="underline">apple</span></a>
                      } */}
                    </li>
                  ))
                }
              </ul>
            </div>
          )) 
        }
      </div>

      <div className="m-6 px-4 py-3 border">
        twitter: @fthrrhmn31
        <br/>
        spotify: Aditya Fathurrahman
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  let { data } = await supabase
    .from('groups')
    .select(
      `
        id,
        title,
        albums (
          id,
          title,
          year,
          genres ( id, genre ),
          artists ( id, name ),
          is_highlighted,
          spotify,
          apple,
          youtube
        )
      `
    )

  return {
    props: {
      groups: data
    },
  }
}