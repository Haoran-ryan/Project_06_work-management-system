<template>
    <div>
        <h1>Announcements</h1>

        <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Content</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="announcement in allAnnouncementsOnSupa" :key="announcement.id">
                <td>{{ announcement.title }}</td>
                <td>{{ announdement.name }}</td>
                <td>
                    <router-link :to="{ name: 'show', params: { id: tutor.id } }">
                    Show
                    </router-link>
                </td>
                <td>
                    <router-link :to="{ name: 'edit', params: { id: tutor.id } }">
                    Edit
                    </router-link>
                </td>
                <td>Delete</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>