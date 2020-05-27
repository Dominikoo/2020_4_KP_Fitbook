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

    @Column(columnDefinition = "int")
    private Integer status; // 0 - brak, 1 - należy do grupy, 2 - poprosił o dołączenie

    public GroupMember() {
    }

    public GroupMember(User user, SocialGroup socialGroup, Integer status) {
        this.user = user;
        this.socialGroup = socialGroup;
        this.status = status;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
