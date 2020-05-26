package com.fitbook.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "Group_Members")
public class GroupMember {
    @Id
    @GeneratedValue(generator = "post_generator")
    @SequenceGenerator(
            name = "post_generator",
            sequenceName = "post_sequence",
            initialValue = 1000
    )
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private SocialGroup socialGroup;

    public GroupMember() {
    }

    public GroupMember(User user, SocialGroup socialGroup) {
        this.user = user;
        this.socialGroup = socialGroup;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SocialGroup getSocialGroup() {
        return socialGroup;
    }

    public void setSocialGroup(SocialGroup socialGroup) {
        this.socialGroup = socialGroup;
    }
}
